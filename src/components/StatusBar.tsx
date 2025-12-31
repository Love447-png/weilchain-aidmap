import { DollarSign, Users, AlertTriangle, CheckCircle } from "lucide-react";

interface StatusBarProps {
  totalFunds: number;
  distributed: number;
  beneficiaries: number;
  activeZones: number;
}

const StatusBar = ({ totalFunds, distributed, beneficiaries, activeZones }: StatusBarProps) => {
  const distributedPercentage = (distributed / totalFunds) * 100;

  return (
    <div className="bg-gradient-status text-primary-foreground p-4 shadow-elevated">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Total Funds</p>
              <p className="text-lg font-bold">${totalFunds.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Distributed</p>
              <p className="text-lg font-bold">${distributed.toLocaleString()} <span className="text-sm opacity-80">({distributedPercentage.toFixed(1)}%)</span></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Beneficiaries</p>
              <p className="text-lg font-bold">{beneficiaries}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-emergency/80 rounded-lg animate-pulse-slow">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Active Zones</p>
              <p className="text-lg font-bold">{activeZones}</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-foreground rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${distributedPercentage}%` }}
            />
          </div>
          <p className="text-xs mt-1 opacity-70">Fund Distribution Progress</p>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
