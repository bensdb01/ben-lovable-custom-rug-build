
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-serif text-xl mb-4">The Natural Rug Company</h3>
            <p className="text-white/70 text-sm mb-6">
              Family-run business specializing in high-quality, handcrafted rugs made from natural materials since 2006.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Our Materials
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Custom Rug Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Request Samples
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Care & Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Our Process
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-sage flex-shrink-0 mt-0.5" />
                <a href="tel:03330344403" className="text-white/70 hover:text-white transition-colors text-sm">
                  03330 344 403
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-sage flex-shrink-0 mt-0.5" />
                <a href="mailto:contact@naturalrugcompany.co.uk" className="text-white/70 hover:text-white transition-colors text-sm">
                  contact@naturalrugcompany.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-sage flex-shrink-0 mt-0.5" />
                <address className="text-white/70 text-sm not-italic">
                  1 Acacia Grove, West Kirby,<br/>Wirral, CH48 4DD
                </address>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} The Natural Rug Company. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-white/50 text-xs">
              Designed with ♥ in the UK
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
