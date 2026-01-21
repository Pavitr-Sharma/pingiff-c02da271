import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/ping-me-logo.png";
import { Mail, Phone, ArrowRight, User, Car } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState<"auth" | "details">("auth");
  const [method, setMethod] = useState<"google" | "phone" | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    vehicleNumber: "",
    vehicleModel: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    // Placeholder for Google OAuth
    toast({
      title: "Google Signup",
      description: "Google authentication will be implemented with backend integration.",
    });
    setStep("details");
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
      title: "Phone Verified!",
      description: "Please complete your profile.",
    });
    setStep("details");
  };

  const handleCompleteRegistration = () => {
    if (!formData.fullName || !formData.vehicleNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Welcome to PingME!",
      description: "Your account has been created successfully.",
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
            {step === "auth" && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
                <p className="text-muted-foreground text-center mb-8">
                  Join PingME and protect your vehicle
                </p>

                {!method && (
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      size="full"
                      className="justify-start gap-4"
                      onClick={handleGoogleSignup}
                    >
                      <Mail className="w-5 h-5" />
                      Sign up with Google
                    </Button>
                    <Button
                      variant="outline"
                      size="full"
                      className="justify-start gap-4"
                      onClick={() => setMethod("phone")}
                    >
                      <Phone className="w-5 h-5" />
                      Sign up with Phone
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
                      Verify & Continue
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
                    Already have an account?{" "}
                    <Link to="/login" className="text-foreground font-semibold hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </>
            )}

            {step === "details" && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2">Complete Profile</h1>
                <p className="text-muted-foreground text-center mb-8">
                  Tell us about yourself and your vehicle
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vehicleNumber" className="flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      Vehicle Number *
                    </Label>
                    <Input
                      id="vehicleNumber"
                      type="text"
                      placeholder="UP53 DJ1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vehicleModel">Vehicle Model/Type</Label>
                    <Input
                      id="vehicleModel"
                      type="text"
                      placeholder="Honda Activa"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <Button size="full" onClick={handleCompleteRegistration}>
                    Complete Registration
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
