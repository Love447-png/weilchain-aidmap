import { Shield, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground tracking-tight">WeilChain</h1>
              <p className="text-xs text-muted-foreground">Disaster Relief Platform</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emergency rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                A
              </div>
              <span className="text-sm font-medium text-card-foreground hidden sm:block">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
