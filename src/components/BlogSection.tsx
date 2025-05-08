
import { ArrowRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Natural Rug for Your Home",
    excerpt: "Finding the right natural rug involves considering fiber type, room placement, usage patterns, and more. Read our comprehensive guide.",
    category: "Buying Guide",
    date: "May 18, 2023",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cnVnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    title: "The Environmental Benefits of Natural Fiber Flooring",
    excerpt: "Natural fibers like jute, sisal, and seagrass are renewable, biodegradable, and sustainable alternatives to synthetic carpeting.",
    category: "Sustainability",
    date: "April 3, 2023",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvJTIwZnJpZW5kbHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    title: "How to Clean and Maintain Your Natural Fiber Rug",
    excerpt: "Proper care extends the life of your natural fiber rug. Learn about regular maintenance, spot cleaning, and professional care.",
    category: "Care & Maintenance",
    date: "March 12, 2023",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xlYW5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  }
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Latest Articles</h2>
            <p className="text-muted-foreground">
              Discover insights, guides, and inspiration for creating beautiful, sustainable living spaces with natural rugs.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollAnimation key={post.id} delay={index * 100}>
              <div className="group overflow-hidden border border-border/50 rounded-xl bg-white hover:shadow-material transition-all duration-300">
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/9]">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-sage/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
                  <h3 className="font-serif text-xl mb-2 line-clamp-2 leading-tight">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <a href="#" className="inline-flex items-center text-brand-sage text-sm font-medium hover:text-brand-sage/80 transition-colors">
                    Read more <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/blog" className="inline-flex items-center px-4 py-2 border border-brand-sage text-brand-sage rounded-md hover:bg-brand-sage/5 transition-colors">
            View all articles
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
