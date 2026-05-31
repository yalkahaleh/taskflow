"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/ui.slice";
import { useLogout } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const pathname = usePathname();
  const { mutate: logout } = useLogout();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16",
      )}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {sidebarOpen && <span className="font-bold text-lg">TaskFlow</span>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto"
        >
          {sidebarOpen ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t">
        <button
          onClick={() => logout()}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <LogOut className="size-4 shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
