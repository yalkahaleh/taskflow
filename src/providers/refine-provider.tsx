"use client";

import { Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider from "@refinedev/nextjs-router";
import { createClient } from "@/lib/supabase/client";
import { resources } from "@/config/resources";
import { authProvider } from "./auth-provider";

const supabaseClient = createClient();

export default function RefineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      routerProvider={routerProvider}
      authProvider={authProvider}
      resources={resources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        liveMode: "auto",
      }}
    >
      {children}
    </Refine>
  );
}
