import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ping-me-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="PingME Logo" 
            className="h-10 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/#product" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Product
          </Link>
          <Link to="/#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
