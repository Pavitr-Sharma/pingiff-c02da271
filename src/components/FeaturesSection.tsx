import { Shield, Phone, Bell, Eye, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your phone number is never shared. All communication happens through our secure masked calling system.",
  },
  {
    icon: Phone,
    title: "Masked Calls",
    description: "Receive calls without revealing your personal number. Stay connected, stay private.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified immediately when someone scans your QR code with one-tap alert categories.",
  },
  {
    icon: Eye,
    title: "Vehicle Monitoring",
    description: "Know when your vehicle needs attention - wrong parking, blocking roads, or emergencies.",
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Register, get your QR code, and you're ready. No complex installation needed.",
  },
  {
    icon: Heart,
    title: "Peace of Mind",
    description: "Drive, park, and go about your day knowing you'll be alerted if anything happens.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose PingME?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've designed PingME with your privacy and convenience in mind. 
            Here's what makes us different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
