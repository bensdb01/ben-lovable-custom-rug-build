
import { useState } from "react";
import { Quote } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const testimonials = [
  {
    id: 1,
    quote: "The quality of our rug is outstanding. The natural sisal material is exactly what we wanted for our living room, and it feels so luxurious underfoot.",
    author: "Sarah Johnson",
    location: "London",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 2,
    quote: "From selecting the materials to the final delivery, the entire process was seamless. The custom border option made our rug truly unique and perfect for our space.",
    author: "Michael Thompson",
    location: "Edinburgh",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 3,
    quote: "We've purchased three rugs from The Natural Rug Company and each one has exceeded our expectations. The craftsmanship is exceptional and the customer service is outstanding.",
    author: "Emily Parker",
    location: "Manchester",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 4,
    quote: "The attention to detail is remarkable. Our jute rug with the leather border is not only beautiful but extremely durable. Worth every penny for the quality.",
    author: "James Wilson",
    location: "Bath",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Don't just take our word for it. Here's what our customers have to say about their experience with The Natural Rug Company.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Testimonial Card */}
          <ScrollAnimation delay={100}>
            <div className="bg-white rounded-xl p-8 shadow-soft relative overflow-hidden border border-border/50">
              <Quote className="absolute top-6 right-6 h-16 w-16 text-accent/30" />
              
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              
              <blockquote className="text-lg mb-6 relative z-10">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonials[activeIndex].author}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[activeIndex].location}</div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Testimonial Selector */}
          <ScrollAnimation delay={200}>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-accent/30 border-l-4 border-secondary' 
                      : 'bg-white border border-border/50 hover:border-border'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 text-center">
                <a href="#" className="text-secondary hover:text-secondary/80 text-sm font-medium inline-flex items-center gap-1">
                  View all customer reviews
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-3 w-3">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
