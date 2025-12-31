import { useState } from "react";
import { CheckCircle, Clock, User, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Beneficiary {
  id: string;
  name: string;
  location: string;
  status: "verified" | "pending";
  amountDue: number;
  paid: boolean;
  avatarColor: string;
}

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  onPay: (id: string) => void;
}

const BeneficiaryList = ({ beneficiaries, onPay }: BeneficiaryListProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handlePay = async (beneficiary: Beneficiary) => {
    setLoadingId(beneficiary.id);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPay(beneficiary.id);
    setLoadingId(null);
    
    toast({
      title: "Payment Successful",
      description: `$${beneficiary.amountDue.toLocaleString()} sent to ${beneficiary.name}`,
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-card-foreground">Verified Beneficiaries</h2>
        </div>
        <span className="text-sm text-muted-foreground">{beneficiaries.filter(b => !b.paid).length} pending</span>
      </div>

      {/* List */}
      <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
        {beneficiaries.map((beneficiary, index) => (
          <div 
            key={beneficiary.id}
            className={`p-4 hover:bg-muted/50 transition-colors animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Avatar and info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0"
                  style={{ backgroundColor: beneficiary.avatarColor }}
                >
                  {beneficiary.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-card-foreground truncate">{beneficiary.name}</p>
                    {beneficiary.status === "verified" ? (
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 text-warning shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{beneficiary.location}</span>
                  </div>
                </div>
              </div>

              {/* Amount and action */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="font-semibold text-card-foreground">${beneficiary.amountDue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Relief fund</p>
                </div>
                
                {beneficiary.paid ? (
                  <div className="flex items-center gap-1 text-success bg-success/10 px-3 py-1.5 rounded-lg">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Paid</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handlePay(beneficiary)}
                    disabled={loadingId === beneficiary.id || beneficiary.status !== "verified"}
                    className="bg-gradient-emergency hover:opacity-90 text-emergency-foreground shadow-md"
                  >
                    {loadingId === beneficiary.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-emergency-foreground/30 border-t-emergency-foreground rounded-full animate-spin" />
                        <span>Processing</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Pay</span>
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeneficiaryList;
