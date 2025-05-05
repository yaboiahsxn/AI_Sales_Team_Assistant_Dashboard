
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home,
  Upload,
  FileText,
  Users, 
  Send,
  ChartBar,
  Settings
} from "lucide-react";

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Call Uploads",
    icon: Upload,
    href: "/calls",
  },
  {
    title: "Meeting Summaries",
    icon: FileText,
    href: "/summaries",
  },
  {
    title: "Lead Scoring",
    icon: Users,
    href: "/leads",
  },
  {
    title: "Follow-up Emails",
    icon: Send,
    href: "/emails",
  },
  {
    title: "Sentiment Analysis",
    icon: ChartBar,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function SideNav() {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-white border-r border-revbot-border">
      <div className="flex h-14 items-center border-b border-revbot-border px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-full bg-revbot-primary flex items-center justify-center text-white font-bold">R</div>
          <span className="text-xl">RevBot</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-revbot-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-revbot-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="font-medium text-sm text-gray-700">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Sales Executive</p>
          </div>
        </div>
      </div>
    </div>
  );
}
