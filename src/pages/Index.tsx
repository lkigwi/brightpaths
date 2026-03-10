import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { PathwayCards } from '@/components/PathwayCards';
import { Advertisement } from '@/components/Advertisement';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Advertisement />
        <PathwayCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
