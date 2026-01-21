import { Link } from "react-router-dom";
import logo from "@/assets/ping-me-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="hazard-stripe-thin h-2" />
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img 
              src={logo} 
              alt="PingME Logo" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-background/70 text-sm max-w-md">
              Protect your vehicle and be reachable without sharing your phone number. 
              Privacy-first vehicle contact solution for modern drivers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#features" className="text-background/70 hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#product" className="text-background/70 hover:text-primary transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-background/70 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/refund-policy" className="text-background/70 hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/70 hover:text-primary transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center">
          <p className="text-sm text-background/50">
            © 2026 plzpingme.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
