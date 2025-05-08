
import { useState, useEffect } from 'react';
import { Star, Truck, ShieldCheck } from 'lucide-react';

const notifications = [
  {
    icon: <Truck className="h-4 w-4 mr-2" />,
    text: "Free Delivery to Mainland UK"
  },
  {
    icon: <div className="mr-2 h-4">
      <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg" alt="Trustpilot 4.8/5" className="h-full" />
    </div>,
    text: "4.8/5 on Trustpilot"
  },
  {
    icon: <div className="mr-2 h-4 flex">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill="#FFC107" className="inline-block">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>,
    text: "4.9/5 on Google Reviews"
  },
  {
    icon: <ShieldCheck className="h-4 w-4 mr-2" />,
    text: "5-Year Guarantee on All Rugs"
  }
];

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldHide, setShouldHide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShouldHide(true);
      } else {
        setShouldHide(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || shouldHide) return null;

  return (
    <div className="bg-brand-charcoal text-white py-2 relative z-50">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full transition-opacity duration-500 flex justify-center">
            <div key={activeIndex} className="flex items-center animate-fade-in">
              {notifications[activeIndex].icon}
              <span className="text-xs font-medium">{notifications[activeIndex].text}</span>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default NotificationBar;
