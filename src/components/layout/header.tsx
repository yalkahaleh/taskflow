"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/ui.slice";
import { useGetIdentity } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface UserIdentity {
  id: string;
  email: string;
  name: string;
}

export function Header() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const { data: identity } = useGetIdentity<UserIdentity>();

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch(toggleSidebar())}
      >
        <Menu className="size-4" />
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{identity?.email}</span>
      </div>
    </header>
  );
}
