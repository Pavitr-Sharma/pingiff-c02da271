import { useState } from "react";
import { 
  Car, 
  Ban, 
  HelpCircle, 
  AlertTriangle, 
  Unlock, 
  Truck, 
  Flame, 
  AlertCircle,
  Phone,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ping-me-logo.png";
import { useToast } from "@/hooks/use-toast";

interface AlertButton {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const alertButtons: AlertButton[] = [
  { id: "parked-wrong", label: "Vehicle is parked wrong", icon: <Car className="w-5 h-5" /> },
  { id: "blocking", label: "Vehicle is blocking the road", icon: <Ban className="w-5 h-5" /> },
  { id: "lost", label: "Vehicle seems to be lost or abandoned", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "hit", label: "Vehicle seems to be hit by something", icon: <AlertTriangle className="w-5 h-5" /> },
  { id: "unlocked", label: "Vehicle is unlocked", icon: <Unlock className="w-5 h-5" /> },
  { id: "tow", label: "Vehicle is about to tow away", icon: <Truck className="w-5 h-5" /> },
  { id: "fire", label: "Vehicle is set on fire & other threat", icon: <Flame className="w-5 h-5" /> },
  { id: "accident", label: "Vehicle is accidented", icon: <AlertCircle className="w-5 h-5" /> },
];

interface ScanViewProps {
  vehicleInfo?: {
    color: string;
    make: string;
    model: string;
    plateNumber: string;
  };
}

const ScanView = ({ 
  vehicleInfo = {
    color: "BROWN",
    make: "HONDA",
    model: "ACTIVA",
    plateNumber: "UP53 DJXXXX"
  }
}: ScanViewProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAlert = async (alertId: string, label: string) => {
    setLoading(alertId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(null);
    toast({
      title: "Alert Sent!",
      description: `The owner has been notified: "${label}"`,
    });
  };

  const handleCall = () => {
    // Placeholder for masked calling service
    toast({
      title: "Connecting...",
      description: "Initiating privacy-protected call to owner.",
    });
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <header className="bg-primary py-3 px-4 flex items-center justify-between shadow-md">
        <img src={logo} alt="PingME" className="h-9" />
        <button className="p-2 hover:bg-foreground/10 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
        </button>
      </header>

      {/* Vehicle Info Card */}
      <div className="px-4 pt-6 pb-4">
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <p className="text-sm text-muted-foreground text-center uppercase tracking-wider">
            {vehicleInfo.color} {vehicleInfo.make} {vehicleInfo.model}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-center mt-1">
            {vehicleInfo.plateNumber}
          </h1>
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-muted-foreground text-sm px-4 mb-4">
        Tap the buttons below to send notification to the owner.
      </p>

      {/* Alert Buttons */}
      <div className="flex-1 px-4 pb-6 space-y-3 overflow-y-auto">
        {alertButtons.map((alert) => (
          <Button
            key={alert.id}
            variant="alert"
            size="full"
            className="gap-4"
            onClick={() => handleAlert(alert.id, alert.label)}
            disabled={loading === alert.id}
          >
            <span className="flex-shrink-0">{alert.icon}</span>
            <span className="flex-1">{alert.label}</span>
            {loading === alert.id && (
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            )}
          </Button>
        ))}
      </div>

      {/* Call Owner Section */}
      <div className="sticky bottom-0 bg-card border-t border-border px-4 py-4 space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleCall}
          className="w-full py-4 bg-success text-success-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg"
        >
          <Phone className="w-5 h-5" />
          CALL OWNER
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Privacy-protected voice contact. No number sharing.
        </p>
        <p className="text-center text-xs text-muted-foreground/70">
          © 2026 PingME™
        </p>
      </div>
    </div>
  );
};

export default ScanView;
