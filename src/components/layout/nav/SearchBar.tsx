'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useSearch } from '@/src/hooks/useSearch';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { getSuggestions } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (value: string) => {
    setQuery(value);
    setIsLoading(true);

    // Clear any existing debounce timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Get search suggestions
    if (value.length >= 2) {
      const results = await getSuggestions(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }

    // Set a new debounce timer for product search
    timeoutRef.current = setTimeout(async () => {
      try {
        // Keep the original search functionality
        await fetch(`/api/products?q=${encodeURIComponent(value)}`);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleSuggestionClick = async (suggestion: any) => {
    setQuery(suggestion.name || suggestion.searchTerm);
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      let searchUrl = `/products?q=${encodeURIComponent(suggestion.name || suggestion.searchTerm)}`;
      if (suggestion.type === 'category') {
        searchUrl = `/products?category=${encodeURIComponent(suggestion.searchTerm)}`;
      }

      // Navigate to search results page
      window.location.href = searchUrl;
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full px-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          placeholder="Search products..."
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {isLoading && (
          <Loader2 className="absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
            Search suggestions
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
            >
              {suggestion.type === 'product' && suggestion.image && (
                <img src={suggestion.image} alt="" className="w-8 h-8 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="font-medium text-sm">{suggestion.name}</div>
                {suggestion.type === 'product' && (
                  <div className="text-xs text-gray-500">${suggestion.price} • {suggestion.category}</div>
                )}
                {suggestion.type === 'category' && (
                  <div className="text-xs text-gray-500">Category</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
