import { Car, Users, MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-foreground text-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              About PingME
            </h2>
            <p className="text-background/70 text-lg">
              The story behind privacy-first vehicle contact
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-center mb-12">
            <p className="text-background/80 text-lg leading-relaxed">
              We started PingME because we saw a simple problem: how do you let 
              someone contact you about your parked vehicle without giving away 
              your phone number? Whether it's wrong parking, an emergency, or 
              just someone trying to help—you should be reachable without 
              compromising your privacy.
            </p>
            <p className="text-background/80 text-lg leading-relaxed mt-4">
              Our solution is a beautifully designed QR code card that hangs on 
              your vehicle. When scanned, it allows the person to send you 
              predefined alerts or make a privacy-protected call—all without 
              ever seeing your number.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StatCard 
              icon={<Car className="w-8 h-8" />}
              value="10,000+"
              label="Vehicles Protected"
            />
            <StatCard 
              icon={<Users className="w-8 h-8" />}
              value="50,000+"
              label="Alerts Sent"
            />
            <StatCard 
              icon={<MapPin className="w-8 h-8" />}
              value="100+"
              label="Cities Covered"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string;
}) => (
  <div className="text-center p-6 rounded-2xl bg-background/5 border border-background/10">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 text-primary-foreground">
      {icon}
    </div>
    <div className="text-3xl font-bold text-primary mb-1">{value}</div>
    <div className="text-background/60 text-sm">{label}</div>
  </div>
);

export default AboutSection;
