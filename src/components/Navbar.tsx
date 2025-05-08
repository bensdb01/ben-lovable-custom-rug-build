
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shop menu categories for pre-configured rugs
  const shopMenuItems = [
    {
      title: "Shop by Material",
      description: "Explore our range based on natural fibers",
      href: "/shop/material",
      items: [
        { title: "Jute Collection", href: "/shop/material/jute", description: "Soft, versatile rugs ideal for living spaces" },
        { title: "Sisal Collection", href: "/shop/material/sisal", description: "Durable options in 15+ colors and patterns" },
        { title: "Seagrass Collection", href: "/shop/material/seagrass", description: "Stain-resistant rugs for high-traffic areas" },
        { title: "Coir Collection", href: "/shop/material/coir", description: "Tough rugs perfect for entrances and mudrooms" },
        { title: "Wool Collection", href: "/shop/material/wool", description: "Luxuriously soft with natural insulation" },
        { title: "Sisool Collection", href: "/shop/material/sisool", description: "Perfect blend of sisal and wool for balanced comfort" }
      ]
    },
    {
      title: "Shop by Room",
      description: "Pre-configured rugs perfect for specific spaces",
      href: "/shop/by-room",
      items: [
        { title: "Living Room", href: "/shop/by-room/living-room", description: "Cozy foundation pieces for your main living space" },
        { title: "Bedroom", href: "/shop/by-room/bedroom", description: "Soft, comfortable rugs for peaceful bedrooms" },
        { title: "Dining Room", href: "/shop/by-room/dining-room", description: "Durable options that withstand food spills" },
        { title: "Kitchen", href: "/shop/by-room/kitchen", description: "Easy-clean rugs for busy kitchen spaces" },
        { title: "Hallway", href: "/shop/by-room/hallway", description: "Hardwearing runners for high-traffic areas" },
        { title: "Home Office", href: "/shop/by-room/office", description: "Focused productivity with comfortable underfoot feel" }
      ]
    },
    {
      title: "Shop by Style",
      description: "Find rugs that match your interior aesthetic",
      href: "/shop/style",
      items: [
        { title: "Minimalist", href: "/shop/style/minimalist", description: "Clean lines and subtle textures" },
        { title: "Coastal", href: "/shop/style/coastal", description: "Beach-inspired natural tones" },
        { title: "Scandinavian", href: "/shop/style/scandinavian", description: "Light, bright and airy designs" },
        { title: "Traditional", href: "/shop/style/traditional", description: "Timeless patterns and classic appeal" },
        { title: "Bohemian", href: "/shop/style/bohemian", description: "Eclectic textures and natural fibers" },
        { title: "Contemporary", href: "/shop/style/contemporary", description: "Modern styles for current trends" }
      ]
    },
    {
      title: "Inspiration Gallery",
      description: "Browse customer photos and designer showcases",
      href: "/inspiration",
      items: [
        { title: "Customer Showcases", href: "/inspiration/customer-showcases", description: "Real homes with our natural rugs" },
        { title: "Designer Collaborations", href: "/inspiration/designer-collaborations", description: "Exclusive collections by interior designers" },
        { title: "Seasonal Trends", href: "/inspiration/seasonal", description: "Latest seasonal styles and ideas" },
        { title: "Before & After", href: "/inspiration/before-after", description: "Transformations with natural rugs" }
      ]
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/95 backdrop-blur-lg shadow-sm"
          : "py-4 bg-transparent mt-8"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center">
          <img 
            src="/lovable-uploads/8adfdb30-692f-4311-8849-abf1b6673b04.png" 
            alt="The Natural Rug Company" 
            className="h-10 md:h-12" 
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent">
                  Shop Collections
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-4 gap-3 p-6 w-[900px]">
                    {shopMenuItems.map((item) => (
                      <div key={item.title} className="space-y-3">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <ul className="grid gap-2">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <a 
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-2 text-xs leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="font-medium">{subItem.title}</div>
                                  {subItem.description && (
                                    <p className="text-xs text-muted-foreground line-clamp-1">{subItem.description}</p>
                                  )}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/20 p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Want something completely unique?</p>
                      <p className="text-xs text-muted-foreground">Create your perfect rug with our custom builder</p>
                    </div>
                    <a 
                      href="#process" 
                      className="bg-brand-accent hover:bg-brand-accent/90 text-white px-4 py-2 rounded text-sm"
                    >
                      Design Your Rug
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#materials"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
                >
                  Materials
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#process"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
                >
                  Rug Builder
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#testimonials"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
                >
                  Reviews
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#gallery"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
                >
                  Gallery
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#help-hub"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
                >
                  Help Hub
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <a
            href="tel:03330344403"
            className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
          >
            <Phone size={16} />
            03330 344 403
          </a>
        </div>

        <div className="hidden md:block">
          <Button className="bg-brand-accent text-white hover:bg-brand-accent/90">
            Design Your Rug
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-md py-6 px-4 border-t border-border/50 animate-fade-in z-50">
          <div className="flex flex-col space-y-4">
            <div className="py-2 px-4 rounded-md hover:bg-accent/20 transition-colors">
              <div className="flex justify-between items-center" onClick={(e) => {
                const target = e.currentTarget.nextElementSibling;
                if (target) {
                  target.classList.toggle("hidden");
                }
              }}>
                <span className="text-sm font-medium">Shop Collections</span>
                <ChevronDown size={16} />
              </div>
              <div className="hidden mt-2 ml-2 space-y-2">
                {shopMenuItems.map((category) => (
                  <div key={category.title} className="mb-3">
                    <a href={category.href} className="text-sm font-medium">{category.title}</a>
                    <div className="mt-1 ml-3 space-y-1">
                      {category.items.slice(0, 3).map((item) => (
                        <a 
                          key={item.title}
                          href={item.href}
                          className="block text-xs text-muted-foreground hover:text-foreground py-1"
                        >
                          {item.title}
                        </a>
                      ))}
                      <a href={category.href} className="block text-xs text-brand-accent hover:text-brand-accent/80 py-1">
                        View all {category.title.toLowerCase()}...
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <a
              href="#materials"
              className="text-sm font-medium py-2 px-4 hover:bg-accent/20 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Materials
            </a>
            <a
              href="#process"
              className="text-sm font-medium py-2 px-4 hover:bg-accent/20 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rug Builder
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium py-2 px-4 hover:bg-accent/20 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium py-2 px-4 hover:bg-accent/20 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#help-hub"
              className="text-sm font-medium py-2 px-4 hover:bg-accent/20 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help Hub
            </a>
            <div className="pt-2">
              <a
                href="tel:03330344403"
                className="flex items-center gap-2 text-sm font-medium py-2 px-4 text-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone size={16} />
                03330 344 403
              </a>
            </div>
            <Button className="bg-brand-accent text-white hover:bg-brand-accent/90 mt-2">
              Design Your Rug
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
