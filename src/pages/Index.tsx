import { useState } from "react";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar";
import DisasterMap from "@/components/DisasterMap";
import BeneficiaryList from "@/components/BeneficiaryList";

const Index = () => {
  const [beneficiaries, setBeneficiaries] = useState([
    { id: "1", name: "Maria Santos", location: "Zone A - Manila", status: "verified" as const, amountDue: 5000, paid: false, avatarColor: "hsl(217, 91%, 30%)" },
    { id: "2", name: "John Cruz", location: "Zone B - Cebu", status: "verified" as const, amountDue: 3500, paid: false, avatarColor: "hsl(142, 76%, 36%)" },
    { id: "3", name: "Ana Reyes", location: "Zone A - Manila", status: "verified" as const, amountDue: 4200, paid: true, avatarColor: "hsl(0, 84%, 60%)" },
    { id: "4", name: "Pedro Garcia", location: "Zone C - Davao", status: "pending" as const, amountDue: 2800, paid: false, avatarColor: "hsl(38, 92%, 50%)" },
    { id: "5", name: "Elena Torres", location: "Zone B - Cebu", status: "verified" as const, amountDue: 6100, paid: false, avatarColor: "hsl(217, 91%, 45%)" },
    { id: "6", name: "Carlos Mendoza", location: "Zone D - Iloilo", status: "verified" as const, amountDue: 3900, paid: true, avatarColor: "hsl(142, 76%, 45%)" },
    { id: "7", name: "Rosa Villanueva", location: "Zone A - Manila", status: "verified" as const, amountDue: 4500, paid: false, avatarColor: "hsl(280, 60%, 50%)" },
    { id: "8", name: "Miguel Aquino", location: "Zone E - Tacloban", status: "verified" as const, amountDue: 5200, paid: false, avatarColor: "hsl(200, 70%, 45%)" },
  ]);

  const disasterZones = [
    { id: "1", name: "Manila Metro", severity: "critical" as const, lat: 14.5995, lng: 120.9842, affected: 125000 },
    { id: "2", name: "Cebu Province", severity: "high" as const, lat: 10.3157, lng: 123.8854, affected: 78000 },
    { id: "3", name: "Davao Region", severity: "moderate" as const, lat: 7.1907, lng: 125.4553, affected: 45000 },
    { id: "4", name: "Iloilo City", severity: "high" as const, lat: 10.7202, lng: 122.5621, affected: 52000 },
    { id: "5", name: "Tacloban Area", severity: "critical" as const, lat: 11.2543, lng: 124.9600, affected: 98000 },
  ];

  const totalFunds = 500000;
  const paidBeneficiaries = beneficiaries.filter(b => b.paid);
  const distributed = paidBeneficiaries.reduce((sum, b) => sum + b.amountDue, 0);

  const handlePay = (id: string) => {
    setBeneficiaries(prev => 
      prev.map(b => b.id === id ? { ...b, paid: true } : b)
    );
  };

  const handleZoneClick = (zone: typeof disasterZones[0]) => {
    console.log("Clicked zone:", zone);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <StatusBar 
        totalFunds={totalFunds}
        distributed={distributed}
        beneficiaries={beneficiaries.length}
        activeZones={disasterZones.length}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="animate-fade-in">
            <DisasterMap 
              zones={disasterZones} 
              onZoneClick={handleZoneClick}
            />
          </div>

          {/* Beneficiaries Section */}
          <div className="animate-fade-in-delay-1">
            <BeneficiaryList 
              beneficiaries={beneficiaries}
              onPay={handlePay}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-delay-2">
          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            <p className="text-2xl font-bold text-card-foreground">2.4h</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold text-success">98.5%</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <p className="text-sm text-muted-foreground">Pending Verification</p>
            <p className="text-2xl font-bold text-warning">{beneficiaries.filter(b => b.status === "pending").length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <p className="text-sm text-muted-foreground">Today's Transactions</p>
            <p className="text-2xl font-bold text-primary">47</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
