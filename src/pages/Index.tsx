
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import NotificationBar from "@/components/NotificationBar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import FeatureCard from "@/components/FeatureCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import EnhancedRugBuilder from "@/components/EnhancedRugBuilder";
import BlogSection from "@/components/BlogSection";
import HelpHub from "@/components/HelpHub";
import WorkWithSection from "@/components/WorkWithSection";
import { Truck, Package, Timer, Shield, ThumbsUp, Palette } from "lucide-react";

// Material images
const materialImages = {
  jute: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  sisal: "https://images.unsplash.com/photo-1589568482418-a6bb810206ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  seagrass: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=982&q=80",
  coir: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
  wool: "https://images.unsplash.com/photo-1604517987553-f02bb013196c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
};

const Index = () => {
  useEffect(() => {
    // Add fonts from Google
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NotificationBar />
      <Navbar />
      <Hero />
      
      {/* Moved the rug builder higher */}
      <EnhancedRugBuilder />
      
      {/* Moved testimonials higher */}
      <Testimonials />
      
      {/* Materials Section */}
      <section id="materials" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Natural Materials</h2>
              <p className="text-muted-foreground">
                We use only the finest natural fibers, each with unique properties and characteristics. Explore our range to find the perfect material for your home.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <MaterialCard
              name="Jute"
              description="Soft, durable, and versatile, ideal for low-traffic areas like bedrooms and living rooms."
              image={materialImages.jute}
              features={[
                "Naturally soft underfoot",
                "Beautiful natural golden color",
                "Sustainable and biodegradable",
                "Ideal for living rooms and bedrooms"
              ]}
              delay={100}
            />
            
            <MaterialCard
              name="Sisal"
              description="Strong, resilient, and available in 15 different colors and weaves, perfect for high-traffic areas."
              image={materialImages.sisal}
              features={[
                "Extremely durable and long-lasting",
                "Available in multiple colors and weaves",
                "Suitable for high-traffic areas",
                "Naturally anti-static"
              ]}
              delay={200}
            />
            
            <MaterialCard
              name="Seagrass"
              description="Hardwearing, stain-resistant, and suitable for high-traffic areas like hallways and dining rooms."
              image={materialImages.seagrass}
              features={[
                "Naturally stain-resistant",
                "Water-resistant properties",
                "Unique textural appearance",
                "Perfect for dining rooms and hallways"
              ]}
              delay={300}
            />
            
            <MaterialCard
              name="Coir"
              description="Tough, moisture-resistant, and excellent for entryways, mudrooms, and outdoor spaces."
              image={materialImages.coir}
              features={[
                "Extremely tough and hardwearing",
                "Excellent for entryways and mudrooms",
                "Natural dirt-trapping properties",
                "Moisture-resistant"
              ]}
              delay={400}
            />
            
            <MaterialCard
              name="Wool"
              description="Soft, insulating, and naturally flame-retardant, suitable for any room in the home."
              image={materialImages.wool}
              features={[
                "Luxuriously soft underfoot",
                "Natural insulating properties",
                "Inherently stain-resistant",
                "Durable and resilient"
              ]}
              delay={500}
            />
            
            <div className="sm:col-span-1 lg:col-span-1 h-full flex items-center justify-center">
              <ScrollAnimation delay={600}>
                <div className="text-center p-8 border border-dashed border-border rounded-xl h-full flex flex-col items-center justify-center">
                  <h3 className="font-serif text-xl mb-3">Not sure which to choose?</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Request free material samples to feel the texture and see the colors in your home.
                  </p>
                  <a 
                    href="#" 
                    className="text-brand-sage hover:text-brand-sage/80 text-sm font-medium inline-flex items-center"
                  >
                    Request Free Samples
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - White background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground">
                At The Natural Rug Company, we pride ourselves on exceptional quality, service, and craftsmanship.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Truck}
              title="Free UK Delivery"
              description="We offer free delivery on all our rugs, no matter the size or weight, to anywhere in the UK mainland."
              delay={100}
            />
            
            <FeatureCard
              icon={Package}
              title="Free Samples"
              description="Request free material samples to help you choose the perfect texture and color for your space."
              delay={200}
            />
            
            <FeatureCard
              icon={Timer}
              title="Quick Turnaround"
              description="Most custom rugs are ready within 2-3 weeks, so you won't have to wait long for your perfect rug."
              delay={300}
            />
            
            <FeatureCard
              icon={Shield}
              title="Quality Guarantee"
              description="We stand behind the quality of every rug we make with our comprehensive satisfaction guarantee."
              delay={400}
            />
            
            <FeatureCard
              icon={ThumbsUp}
              title="Expert Guidance"
              description="Our team of experienced design consultants is always on hand to help you make the right choice."
              delay={500}
            />
            
            <FeatureCard
              icon={Palette}
              title="Bespoke Design"
              description="Create a truly unique rug with our custom design service, tailored to your exact specifications."
              delay={600}
            />
          </div>
        </div>
      </section>
      
      <Gallery />
      <WorkWithSection />
      <BlogSection />
      <HelpHub />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
