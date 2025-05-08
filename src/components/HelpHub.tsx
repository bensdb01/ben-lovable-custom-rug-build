
import { BookOpen, HelpCircle, MessageSquare, FileText, Search, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const helpCategories = [
  {
    id: "buying-guides",
    title: "Buying Guides",
    icon: <BookOpen className="h-6 w-6 text-brand-sage" />,
    description: "Comprehensive guides to help you make the best choice",
    articles: [
      "How to Choose the Right Natural Fiber for Your Home",
      "Understanding Rug Sizes and Placement",
      "Comparing Different Border Options",
      "Selecting the Perfect Rug for High-Traffic Areas"
    ]
  },
  {
    id: "care-maintenance",
    title: "Care & Maintenance",
    icon: <CheckCircle className="h-6 w-6 text-brand-sage" />,
    description: "Tips to keep your rug looking beautiful for years",
    articles: [
      "How to Clean Natural Fiber Rugs",
      "Dealing with Spills and Stains",
      "Seasonal Rug Maintenance Guide",
      "Professional Cleaning vs. DIY Methods"
    ]
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    icon: <HelpCircle className="h-6 w-6 text-brand-sage" />,
    description: "Quick answers to our most common questions",
    articles: [
      "Delivery and Installation Questions",
      "Pricing and Payment Options",
      "Custom Order Process",
      "Returns and Warranties"
    ]
  },
  {
    id: "inspiration",
    title: "Design Inspiration",
    icon: <Lightbulb className="h-6 w-6 text-brand-sage" />,
    description: "Creative ideas and styling tips for your home",
    articles: [
      "Mixing Natural Rugs with Different Interior Styles",
      "Color Combinations That Work with Natural Fibers",
      "Layering Rugs for a Designer Look",
      "Seasonal Styling with Natural Rugs"
    ]
  },
  {
    id: "sustainability",
    title: "Sustainability",
    icon: <FileText className="h-6 w-6 text-brand-sage" />,
    description: "Learn about our eco-friendly practices and materials",
    articles: [
      "The Environmental Impact of Natural Fibers",
      "Our Sustainable Manufacturing Process",
      "Natural vs. Synthetic: The Environmental Comparison",
      "End-of-Life Options for Natural Rugs"
    ]
  },
  {
    id: "contact",
    title: "Contact Support",
    icon: <MessageSquare className="h-6 w-6 text-brand-sage" />,
    description: "Reach out to our knowledgeable team for assistance",
    articles: [
      "Live Chat with Our Design Consultants",
      "Request a Callback",
      "Email Our Support Team",
      "Book a Virtual Consultation"
    ]
  }
];

const HelpHub = () => {
  return (
    <section id="help-hub" className="py-20 bg-brand-cream/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Help Hub</h2>
            <p className="text-muted-foreground">
              Find answers to your questions, explore our comprehensive guides, and get expert advice to make the most of your natural rug.
            </p>
            
            <div className="relative max-w-xl mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-sage focus:border-transparent"
                placeholder="Search the Help Hub..."
              />
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category, index) => (
            <ScrollAnimation key={category.id} delay={index * 100}>
              <div className="bg-white p-6 border border-border/50 rounded-xl hover:shadow-material transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {category.icon}
                  </div>
                  <h3 className="font-serif text-xl">{category.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, idx) => (
                    <li key={idx}>
                      <a 
                        href="#" 
                        className="text-sm flex items-center hover:text-brand-sage transition-colors"
                      >
                        <span className="h-1 w-1 bg-brand-sage rounded-full mr-2"></span>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <a 
                    href="#" 
                    className="text-sm font-medium text-brand-sage hover:text-brand-accent transition-colors flex items-center"
                  >
                    View all in {category.title}
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpHub;
