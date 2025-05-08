
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf, Truck, Clock } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 pb-16 md:pb-0">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(#C2B280_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Background blur elements */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-natural-seagrass/30 rounded-full filter blur-[120px] -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-natural-jute/30 rounded-full filter blur-[100px] -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div 
          className={`w-full lg:w-1/2 text-center lg:text-left space-y-6 transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6 inline-flex">
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium tracking-wider">
              HANDCRAFTED IN THE UK
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight">
            <span className="relative">
              Bespoke Natural Rugs 
              <span className="absolute -top-6 right-0 text-secondary">
                <Sparkles size={20} />
              </span>
            </span>
            <br />
            <span className="text-secondary">Made Just For You</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Create your perfect rug with our custom design service. Handcrafted from sustainable natural materials for exceptional quality and beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 rounded-md group">
              Design Your Rug
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="border-border hover:bg-accent/10 px-8 py-6 rounded-md">
              Free Samples
            </Button>
          </div>
          
          <div className="pt-8 grid grid-cols-3 gap-4">
            <div className="text-center flex flex-col items-center">
              <Leaf className="text-secondary mb-2 h-5 w-5" />
              <div className="font-serif text-lg font-medium">100%</div>
              <div className="text-xs text-muted-foreground">Natural Materials</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <Truck className="text-secondary mb-2 h-5 w-5" />
              <div className="font-serif text-lg font-medium">Free</div>
              <div className="text-xs text-muted-foreground">UK Delivery</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <Clock className="text-secondary mb-2 h-5 w-5" />
              <div className="font-serif text-lg font-medium">17+ Years</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </div>
          </div>
        </div>
        
        {/* Image Container */}
        <div 
          className={`w-full lg:w-1/2 relative transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100" : "opacity-0 translate-x-10"
          }`}
        >
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-premium">
            {/* Main Image */}
            <img
              src="https://images.unsplash.com/photo-1633505877752-d84d8e2863f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80"
              alt="Luxury natural rug in a bright interior space"
              className="h-full w-full object-cover"
            />
            
            {/* Floating Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-lg overflow-hidden shadow-lg animate-float">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80"
                alt="Natural rug material close-up"
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Floating Review Card */}
            <div className="absolute top-6 -right-6 glass-panel p-4 rounded-lg max-w-[240px] animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                ★★★★★
              </div>
              <p className="text-sm font-medium">"Exceptional quality and service. Our rug is beautiful!"</p>
              <p className="text-xs mt-2 text-muted-foreground">Emma T. - Verified Customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
