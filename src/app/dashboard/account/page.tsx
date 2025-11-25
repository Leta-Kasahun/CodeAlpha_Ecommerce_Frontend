'use client';

// app/dashboard/account/page.tsx
// Account settings with inline edit form (PUT /api/user-profile). Responsive, brand-colored, no console logs.

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/src/stores';
import { Edit2, Mail, Phone, MapPin, Save, X } from 'lucide-react';

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  address?: {
    city?: string;
    postalCode?: string;
    country?: string;
  };
};

export default function AccountPage() {
  const router = useRouter();
  const { user, token, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      address: {
        city: user?.address?.city ?? '',
        postalCode: user?.address?.postalCode ?? '',
        country: user?.address?.country ?? ''
      }
    }
  });

  useEffect(() => {
    reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      address: {
        city: user?.address?.city ?? '',
        postalCode: user?.address?.postalCode ?? '',
        country: user?.address?.country ?? ''
      }
    });
    setAvatarPreview(user?.avatar ?? null);
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    setErrorMessage(null);
    setSaving(true);

    try {
      const payload = {
        name: data.name?.trim(),
        phone: data.phone?.trim() || '',
        address: {
          city: data.address?.city?.trim() || '',
          postalCode: data.address?.postalCode?.trim() || '',
          country: data.address?.country?.trim() || ''
        }
      };

      const res = await fetch('/api/user-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const message = json?.message || 'Failed to update profile';
        setErrorMessage(message);
        return;
      }

      const updated = await res.json().catch(() => null);

      // Update local store with returned user fields or fallback to sent payload
      const newUser = {
        ...user,
        name: updated?.name ?? payload.name,
        phone: updated?.phone ?? payload.phone,
        address: updated?.address ?? payload.address
      };
      updateUser(newUser);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = (file?: File | null) => {
    if (!file) {
      setAvatarPreview(user?.avatar ?? null);
      return;
    }
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    // Note: actual upload should be implemented (separate API endpoint).
  };

  const startEditing = () => setEditing(true);
  const cancelEditing = () => {
    reset();
    setEditing(false);
    setErrorMessage(null);
    setAvatarPreview(user?.avatar ?? null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage profile, addresses and security settings.</p>
        </div>

        <div className="flex items-center gap-3">
          {!editing ? (
            <button
              onClick={startEditing}
              className="inline-flex items-center gap-2 px-3 py-2 bg-[#5156D2] text-white rounded-md hover:bg-[#3f43b3] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={saving || !isDirty}
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#5156D2] text-white rounded-md hover:bg-[#3f43b3] transition-colors disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={cancelEditing}
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
              {avatarPreview ? (
                <Image src={avatarPreview} alt={user?.name || 'avatar'} fill className="object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#5156D2] flex items-center justify-center text-white font-semibold text-xl">
                  {user?.name ? user.name.split(' ')[0][0]?.toUpperCase() : 'U'}
                </div>
              )}
            </div>

            <div>
              <div className="text-lg font-medium text-gray-900">{user?.name || 'Guest'}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-sm text-gray-700 flex items-center gap-2">
              <Mail className="inline-block mr-2 w-4 h-4 text-[#5156D2]" />
              <span>{user?.email}</span>
            </div>
            <div className="text-sm text-gray-700 flex items-center gap-2">
              <Phone className="inline-block mr-2 w-4 h-4 text-[#5156D2]" />
              <span>{user?.phone || '—'}</span>
            </div>
            <div className="text-sm text-gray-700 flex items-center gap-2">
              <MapPin className="inline-block mr-2 w-4 h-4 text-[#5156D2]" />
              <span>{user?.address?.city || '—'}</span>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/account/change-password" className="block px-3 py-2 bg-[#5156D2] text-white rounded-md text-center hover:bg-[#3f43b3]">
              Change Password
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">Full name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  disabled={!editing}
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-[#5156D2] disabled:bg-gray-50"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-500">Email</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  disabled
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">Phone</label>
                <input
                  {...register('phone')}
                  disabled={!editing}
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-[#5156D2] disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500">City</label>
                <input
                  {...register('address.city')}
                  disabled={!editing}
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-[#5156D2] disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">Postal Code</label>
                <input
                  {...register('address.postalCode')}
                  disabled={!editing}
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-[#5156D2] disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500">Country</label>
                <input
                  {...register('address.country')}
                  disabled={!editing}
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-[#5156D2] disabled:bg-gray-50"
                />
              </div>
            </div>

            {editing && (
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                  Upload avatar
                </label>

                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || !isDirty}
                  className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-[#5156D2] text-white rounded-md hover:bg-[#3f43b3] disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            )}

            {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Active sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <div className="text-sm font-medium text-gray-900">This device</div>
                  <div className="text-xs text-gray-500">Chrome • MacOS • Last active now</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md border border-gray-200 text-sm hover:bg-gray-50">Sign out other sessions</button>
                </div>
              </div>

              <div className="text-xs text-gray-500">Manage sessions to keep your account secure.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}