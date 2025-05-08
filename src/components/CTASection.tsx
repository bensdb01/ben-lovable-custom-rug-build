
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "./ScrollAnimation";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(#ADA296_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-sage/20 rounded-full filter blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation>
            <div className="mb-6 inline-flex">
              <span className="bg-brand-charcoal/10 text-brand-charcoal px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                FREE UK DELIVERY
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to create your perfect rug?</h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Start designing your bespoke rug today with our easy-to-use rug builder. Get free material samples delivered to your door.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-charcoal hover:bg-brand-charcoal/90 text-white px-8 py-6 rounded-md group">
                Design Your Rug
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="border-border hover:bg-accent/10 px-8 py-6 rounded-md">
                Request Free Samples
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
