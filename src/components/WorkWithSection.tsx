
import { Users, Building, HomeIcon, Star, PenTool, Brush, User } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const partnerGroups = {
  "interior-designers": {
    title: "Interior Designers",
    icon: <PenTool className="h-10 w-10 text-brand-sage" />,
    description: "We partner with interior designers to provide bespoke natural rugs for their residential and commercial projects.",
    benefits: [
      "Dedicated design consultant for your projects",
      "Trade discounts and special pricing",
      "Custom color matching and material combinations",
      "Priority sampling service",
      "Fast-track production for client deadlines",
      "Design collaboration opportunities"
    ],
    testimonial: {
      quote: "The Natural Rug Company has been an invaluable partner for our design firm. Their bespoke service and exceptional quality rugs have helped us complete numerous high-end residential projects to our clients' satisfaction.",
      author: "Emma Richardson",
      title: "Principal Designer, Harmony Interiors"
    },
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  "architects": {
    title: "Architects",
    icon: <Building className="h-10 w-10 text-brand-sage" />,
    description: "We collaborate with architects to integrate sustainable, natural flooring solutions into their innovative building designs.",
    benefits: [
      "Technical specifications and documentation",
      "Sustainability credentials for green building certifications",
      "On-site consultations and measurements",
      "Custom samples for client presentations",
      "Project management support",
      "Volume discounts for large projects"
    ],
    testimonial: {
      quote: "When specifying natural flooring for our eco-conscious clients, The Natural Rug Company is our go-to supplier. Their knowledge, quality materials, and reliable service make them an excellent project partner.",
      author: "David Thompson",
      title: "Senior Architect, Sustainable Spaces"
    },
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  "homeowners": {
    title: "Homeowners",
    icon: <User className="h-10 w-10 text-brand-sage" />,
    description: "We help homeowners create the perfect natural rugs for their living spaces, offering expert guidance and personalized service.",
    benefits: [
      "Personal design consultations in-home or virtual",
      "Custom samples delivered to your door",
      "Detailed measuring service available",
      "Expert advice on choosing the right material",
      "Seamless installation coordination",
      "Aftercare guidance and support"
    ],
    testimonial: {
      quote: "The Natural Rug Company guided me through every step of creating my custom rug. The result is gorgeous – exactly what my living room needed, and the quality is exceptional.",
      author: "Rebecca Taylor",
      title: "Homeowner, Cheshire"
    },
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80"
  },
  "property-developers": {
    title: "Property Developers",
    icon: <HomeIcon className="h-10 w-10 text-brand-sage" />,
    description: "We support property developers with high-quality natural flooring solutions for new builds and renovation projects.",
    benefits: [
      "Project-based pricing and volume discounts",
      "Consistent quality across multiple properties",
      "Coordinated delivery schedules",
      "Durable options suitable for rental properties",
      "Short lead times for development schedules",
      "Direct billing and account management"
    ],
    testimonial: {
      quote: "For our luxury apartment developments, we need flooring that offers both quality and durability. The Natural Rug Company provides excellent products that enhance our property values and satisfy our buyers.",
      author: "Michael Brooks",
      title: "Managing Director, Prestige Homes"
    },
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  "hospitality": {
    title: "Hospitality Venues",
    icon: <Star className="h-10 w-10 text-brand-sage" />,
    description: "We provide durable, beautiful natural rugs for hotels, restaurants, and other hospitality spaces.",
    benefits: [
      "Commercial-grade materials for high-traffic areas",
      "Stain-resistant and easy-maintenance options",
      "Fire safety compliance for commercial spaces",
      "Custom designs to match branding",
      "Installation coordination services",
      "Ongoing maintenance programs"
    ],
    testimonial: {
      quote: "Our boutique hotel needed rugs that were both luxurious and durable. The Natural Rug Company delivered exceptional products that have withstood heavy foot traffic while maintaining their beauty.",
      author: "Sarah Martinez",
      title: "Operations Manager, The Wellington Hotel"
    },
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80"
  }
};

const WorkWithSection = () => {
  return (
    <section id="work-with" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="mb-4 inline-flex">
              <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                INDUSTRY EXPERTISE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Who We Work With</h2>
            <p className="text-muted-foreground">
              We've partnered with professionals and homeowners across various sectors to provide natural flooring solutions for projects of all sizes.
            </p>
          </div>
        </ScrollAnimation>

        <Tabs defaultValue="homeowners" className="space-y-8">
          <div className="flex justify-center overflow-x-auto">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 bg-primary/50">
              <TabsTrigger value="homeowners" className="px-3 sm:px-5 text-xs sm:text-sm whitespace-nowrap">Homeowners</TabsTrigger>
              <TabsTrigger value="interior-designers" className="px-3 sm:px-5 text-xs sm:text-sm whitespace-nowrap">Interior Designers</TabsTrigger>
              <TabsTrigger value="architects" className="px-3 sm:px-5 text-xs sm:text-sm whitespace-nowrap">Architects</TabsTrigger>
              <TabsTrigger value="property-developers" className="px-3 sm:px-5 text-xs sm:text-sm whitespace-nowrap">Property Developers</TabsTrigger>
              <TabsTrigger value="hospitality" className="px-3 sm:px-5 text-xs sm:text-sm whitespace-nowrap">Hospitality</TabsTrigger>
            </TabsList>
          </div>
          
          {Object.entries(partnerGroups).map(([key, group]) => (
            <TabsContent key={key} value={key} className="pt-4">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <ScrollAnimation delay={100}>
                  <div>
                    <div className="mb-6 flex items-center">
                      {group.icon}
                      <h3 className="font-serif text-2xl ml-3">{group.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-8">
                      {group.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <h4 className="font-medium">How we support {group.title}:</h4>
                      <ul className="grid gap-3">
                        {group.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-brand-sage/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                              <span className="h-2 w-2 bg-brand-sage rounded-full"></span>
                            </div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-primary/30 border border-border/50 p-6 rounded-xl">
                      <p className="italic text-muted-foreground mb-4">"{group.testimonial.quote}"</p>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-brand-sage/20 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-brand-sage" />
                        </div>
                        <div>
                          <div className="font-medium">{group.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{group.testimonial.title}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation delay={200}>
                  <div className="overflow-hidden rounded-xl border border-border/50">
                    <img 
                      src={group.image} 
                      alt={`${group.title} project`} 
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </div>
                  
                  <div className="mt-8 p-6 border border-border/50 rounded-xl bg-white">
                    <h4 className="font-serif text-xl mb-4">Partner With Us</h4>
                    <p className="text-muted-foreground mb-6">
                      {key === 'homeowners' 
                        ? 'Get in touch with our design team to create your perfect natural rug or request free samples.' 
                        : 'Join our trade program for exclusive benefits including special pricing, dedicated support, priority service, and more.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href="#" 
                        className="bg-brand-sage hover:bg-brand-sage/90 text-foreground px-6 py-2 rounded-md text-center text-sm font-medium"
                      >
                        {key === 'homeowners' ? 'Request Consultation' : 'Apply for Trade Account'}
                      </a>
                      <a 
                        href="#" 
                        className="border border-brand-sage text-brand-sage hover:bg-brand-sage/5 px-6 py-2 rounded-md text-center text-sm font-medium"
                      >
                        Download Brochure
                      </a>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default WorkWithSection;
