
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from './SideNav';
import { Header } from './Header';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="p-0">
          <SideNav />
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-col flex-1">
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-revbot-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
