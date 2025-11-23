import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-cta rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Shopsphere
            </h1>
            <p className="text-muted-foreground mb-6">
              Modern shopping experience
            </p>
            <button className="bg-cta text-white px-6 py-2 rounded hover:bg-cta-hover transition-colors">
              Shop Now
            </button>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-semibold text-foreground text-center mb-6">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {/* Product 1 */}
              <div className="bg-background border border-border rounded p-4 text-center">
                <div className="w-12 h-12 bg-cta/20 rounded flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">📱</span>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">Smartphone</h3>
                <p className="text-cta text-sm font-bold mb-2">$299</p>
                <button className="bg-cta text-white px-3 py-1 rounded text-xs hover:bg-cta-hover transition-colors">
                  Add to Cart
                </button>
              </div>

              {/* Product 2 */}
              <div className="bg-background border border-border rounded p-4 text-center">
                <div className="w-12 h-12 bg-success/20 rounded flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">🎧</span>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">Headphones</h3>
                <p className="text-cta text-sm font-bold mb-2">$89</p>
                <button className="bg-cta text-white px-3 py-1 rounded text-xs hover:bg-cta-hover transition-colors">
                  Add to Cart
                </button>
              </div>

              {/* Product 3 */}
              <div className="bg-background border border-border rounded p-4 text-center">
                <div className="w-12 h-12 bg-warm-accent/20 rounded flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">⌚</span>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">Smart Watch</h3>
                <p className="text-cta text-sm font-bold mb-2">$199</p>
                <button className="bg-cta text-white px-3 py-1 rounded text-xs hover:bg-cta-hover transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Start Shopping Today
            </h2>
            <button className="border border-border text-foreground px-6 py-2 rounded hover:bg-background transition-colors">
              View All Products
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}