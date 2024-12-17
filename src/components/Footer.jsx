// components/Footer.js
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = ({ colorTheme }) => {
  return (
    <footer className="mt-auto py-8" style={{ backgroundColor: colorTheme.primary }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>Contact</h4>
            <div className="space-y-2">
              <a 
                href="tel:+33000000000" 
                className="flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105" 
                style={{ color: colorTheme.text }}
              >
                <Phone className="flex-shrink-0" size={20} />
                <span className="flex-1 break-all">+33 0 00 00 00 00</span>
              </a>
              <a 
                href="mailto:contact@inkorner.com" 
                className="flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105" 
                style={{ color: colorTheme.text }}
              >
                <Mail className="flex-shrink-0" size={20} />
                <span className="flex-1 break-all">contact@inkorner.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>Suivez-nous</h4>
            <a 
              href="https://www.instagram.com/inkorner.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105"
              style={{ color: colorTheme.text }}
            >
              <Instagram className="flex-shrink-0" size={20} />
              <span>@inkorner</span>
            </a>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{ color: colorTheme.text }}>Newsletter</h4>
            <div className="max-w-full">
              <div className="flex flex-col md:flex-row gap-2 max-w-full">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full md:max-w-[65%] px-4 py-2 rounded md:rounded-l focus:outline-none transition-all duration-300 focus:scale-105"
                />
                <button
                  className="w-full md:w-auto px-4 py-2 rounded md:rounded-r whitespace-nowrap transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: colorTheme.accent,
                    color: colorTheme.text,
                  }}
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;