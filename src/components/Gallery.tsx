
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "./ScrollAnimation";

// Sample images for gallery
const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    alt: "Living room with natural sisal rug"
  },
  {
    url: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    alt: "Bedroom with wool rug"
  },
  {
    url: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Dining room with jute rug"
  },
  {
    url: "https://images.unsplash.com/photo-1582201957424-ccc88a0c3628?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    alt: "Neutral living room with natural rug"
  },
  {
    url: "https://images.unsplash.com/photo-1617104678502-cde02d478e6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
    alt: "Hallway with runner rug"
  },
  {
    url: "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    alt: "Living space with natural rug and plants"
  }
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Auto rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * (scrollRef.current.clientWidth / 3),
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Customer Gallery</h2>
            <p className="text-muted-foreground">
              Browse our gallery of beautiful rugs in real homes. Each piece is uniquely crafted to enhance the space it adorns.
            </p>
          </div>
        </ScrollAnimation>

        {/* Mobile Gallery (Show only on small screens) */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="aspect-square w-full transition-all duration-700 ease-in-out"
            >
              <img 
                src={galleryImages[currentIndex].url} 
                alt={galleryImages[currentIndex].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: isAnimating ? 0.7 : 1 }}
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              className="h-9 w-9 rounded-full"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {galleryImages.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-secondary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              className="h-9 w-9 rounded-full"
              disabled={isAnimating}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Gallery (Hidden on mobile) */}
        <ScrollAnimation>
          <div className="hidden md:block relative overflow-hidden">
            <div 
              ref={scrollRef} 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)` 
              }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="min-w-full px-1">
                  <div className="relative group overflow-hidden rounded-xl">
                    <div className="aspect-video">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button variant="secondary" className="glass-button">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-1/2 -translate-y-1/2 left-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-sm border-white/20"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-1/2 -translate-y-1/2 right-4 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-sm border-white/20"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            <div className="flex justify-center mt-4 gap-1">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-secondary' : 'bg-border'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Gallery;
