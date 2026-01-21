import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/ping-me-logo.png";
import { Mail, Phone, ArrowRight } from "lucide-react";

const Login = () => {
  const [method, setMethod] = useState<"google" | "phone" | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    toast({
      title: "Google Login",
      description: "Google authentication will be implemented with backend integration.",
    });
  };

  const handlePhoneSendOtp = () => {
    if (phone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    setShowOtp(true);
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone.",
    });
  };

  const handlePhoneVerify = () => {
    if (otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the verification code.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Logged In!",
      description: "Welcome back to PingME.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <Link to="/">
          <img src={logo} alt="PingME" className="h-12 mx-auto" />
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-muted-foreground text-center mb-8">
              Login to access your dashboard
            </p>

            {!method && (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="full"
                  className="justify-start gap-4"
                  onClick={handleGoogleLogin}
                >
                  <Mail className="w-5 h-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  size="full"
                  className="justify-start gap-4"
                  onClick={() => setMethod("phone")}
                >
                  <Phone className="w-5 h-5" />
                  Continue with Phone
                </Button>
              </div>
            )}

            {method === "phone" && !showOtp && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button size="full" onClick={handlePhoneSendOtp}>
                  Send OTP
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="full"
                  onClick={() => setMethod(null)}
                >
                  Back to options
                </Button>
              </div>
            )}

            {method === "phone" && showOtp && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-2 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>
                <Button size="full" onClick={handlePhoneVerify}>
                  Verify & Login
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="full"
                  onClick={() => setShowOtp(false)}
                >
                  Change phone number
                </Button>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-foreground font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
