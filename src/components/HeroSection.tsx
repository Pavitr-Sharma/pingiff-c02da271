import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Phone, QrCode, Bell } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Privacy-First Vehicle Protection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Protect Your Vehicle,{" "}
            <span className="text-primary bg-foreground px-3 py-1 rounded-lg inline-block mt-2">
              Stay Reachable
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Get instant alerts when someone scans your vehicle's QR code. 
            No phone number sharing, just secure, masked communication.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="xl" asChild>
              <Link to="/register">Get Your QR Card — ₹199</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/login">Already a member? Login</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <FeaturePill icon={<QrCode className="w-4 h-4" />} text="Scan to Contact" />
            <FeaturePill icon={<Phone className="w-4 h-4" />} text="Masked Calls" />
            <FeaturePill icon={<Bell className="w-4 h-4" />} text="Instant Alerts" />
            <FeaturePill icon={<Shield className="w-4 h-4" />} text="Privacy Protected" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm">
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default HeroSection;
