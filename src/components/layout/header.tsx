"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/ui.slice";
import {
  markAllAsRead,
  addNotification,
} from "@/store/slices/notification.slice";
import { useGetIdentity } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import { AvatarUpload } from "@/features/profile/components/AvatarUpload";
import { LanguageSwitcher } from "./language-switcher";

interface UserIdentity {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export function Header() {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount } = useAppSelector(
    (state) => state.notification,
  );
  const { data: identity } = useGetIdentity<UserIdentity>();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch(toggleSidebar())}
      >
        <Menu className="size-4" />
      </Button>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
              dispatch(markAllAsRead());
            }}
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white font-bold">
                {unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-10 w-72 bg-card border rounded-md shadow-lg z-50">
              <div className="p-3 border-b font-medium text-sm">
                Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No notifications
                </div>
              ) : (
                <div className="max-h-64 overflow-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-sm border-b ${!n.read ? "bg-muted" : ""}`}
                    >
                      {n.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2"
          >
            <div className="size-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {identity?.avatar ? (
                <img
                  src={identity.avatar}
                  alt="Avatar"
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-muted-foreground">
                  {identity?.name?.[0] ?? identity?.email?.[0] ?? "?"}
                </span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {identity?.email}
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-10 w-64 bg-card border rounded-md shadow-lg z-50 p-4">
              <AvatarUpload />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
