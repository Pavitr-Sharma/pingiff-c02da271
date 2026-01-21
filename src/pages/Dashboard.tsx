import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  QrCode, 
  Plus, 
  ShoppingCart, 
  User, 
  LogOut,
  Car,
  Bell,
  Settings
} from "lucide-react";
import logo from "@/assets/ping-me-logo.png";
import productCard from "@/assets/product-card.png";

const Dashboard = () => {
  const user = {
    name: "John Doe",
    phone: "+91 98765 XXXXX",
    vehicle: {
      number: "UP53 DJ1234",
      model: "Honda Activa",
      color: "Brown",
    },
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="PingME" className="h-10" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Manage your vehicle protection</p>
        </div>

        {/* Vehicle Card */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{user.vehicle.number}</h2>
                <p className="text-muted-foreground text-sm">
                  {user.vehicle.color} {user.vehicle.model}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <QuickActionCard
            icon={<QrCode className="w-6 h-6" />}
            title="View QR Code"
            description="Display your vehicle QR"
            onClick={() => {}}
          />
          <QuickActionCard
            icon={<Plus className="w-6 h-6" />}
            title="Add Vehicle"
            description="Register another vehicle"
            onClick={() => {}}
          />
        </div>

        {/* Order Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Order Products</h2>
          
          <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg">
            <div className="aspect-[16/9] bg-primary/10 relative">
              <img 
                src={productCard} 
                alt="PingME Card" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Standard Car Card</h3>
                  <p className="text-muted-foreground text-sm">With QR code for your vehicle</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">₹199</span>
                  <p className="text-xs text-muted-foreground line-through">₹299</p>
                </div>
              </div>
              <Button size="full">
                <ShoppingCart className="w-4 h-4" />
                Order Now
              </Button>
            </div>
          </div>
        </div>

        {/* Custom Products */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Custom QR Products</h2>
          <div className="grid grid-cols-3 gap-4">
            <CustomProductCard emoji="💻" title="Laptop Tag" price="₹99" />
            <CustomProductCard emoji="🔑" title="Keychain" price="₹79" />
            <CustomProductCard emoji="👜" title="Bag Tag" price="₹89" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-muted-foreground text-sm">{user.phone}</p>
            </div>
          </div>
          <Button variant="outline" size="full" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="bg-card p-4 rounded-2xl border border-border text-left hover:border-primary/50 hover:shadow-md transition-all"
  >
    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-sm">{title}</h3>
    <p className="text-muted-foreground text-xs">{description}</p>
  </button>
);

const CustomProductCard = ({
  emoji,
  title,
  price,
}: {
  emoji: string;
  title: string;
  price: string;
}) => (
  <div className="bg-card p-4 rounded-xl border border-border text-center hover:border-primary/50 transition-colors cursor-pointer">
    <span className="text-2xl">{emoji}</span>
    <h4 className="font-medium text-sm mt-2">{title}</h4>
    <p className="text-primary font-bold text-sm">{price}</p>
  </div>
);

export default Dashboard;
