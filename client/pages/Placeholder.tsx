import { Link } from 'react-router-dom';
import { ChevronRight, Lightbulb } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface PlaceholderProps {
  title: string;
  description?: string;
  icon?: string;
}

export function Placeholder({ title, description, icon }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center section-padding">
        <div className="container-premium">
          <div className="glass-card border-2 border-primary/30 p-12 rounded-3xl text-center space-y-8 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">{icon || '🚀'}</div>
            
            <div>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              {description && (
                <p className="text-lg text-foreground/70 mb-6">{description}</p>
              )}
            </div>

            <div className="bg-[rgba(255,215,0,0.1)] border border-primary/30 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-foreground mb-2">Coming Soon</p>
                  <p className="text-sm text-foreground/70">
                    We're working hard to build this page. In the meantime, check out our homepage or contact us for more information.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary flex items-center justify-center gap-2">
                Back to Home <ChevronRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/234" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
