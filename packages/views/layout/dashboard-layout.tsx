"use client";

import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@multica/ui/components/ui/sidebar";
import { ModalRegistry } from "../modals/registry";
import { SourceBackfillModal } from "../onboarding";
import { AppSidebar } from "./app-sidebar";
import { DashboardGuard } from "./dashboard-guard";
import { NavigationProgress } from "./navigation-progress";
import { WorkspacePresencePrefetch } from "./workspace-presence-prefetch";
import { GlobalShortcuts } from "./global-shortcuts";

interface DashboardLayoutProps {
  children: ReactNode;
  /** Rendered inside SidebarInset (e.g. ChatWindow, ChatFab — absolute-positioned overlays) */
  extra?: ReactNode;
  /** Rendered inside sidebar header as a search trigger */
  searchSlot?: ReactNode;
  /** Loading indicator */
  loadingIndicator?: ReactNode;
}

export function DashboardLayout({
  children,
  extra,
  searchSlot,
  loadingIndicator,
}: DashboardLayoutProps) {
  return (
    <DashboardGuard
      loadingFallback={
        <div className="flex h-svh items-center justify-center">
          {loadingIndicator}
        </div>
      }
    >
      <SidebarProvider className="h-svh bg-app-shell">
        <GlobalShortcuts />
        <WorkspacePresencePrefetch />
        <AppSidebar searchSlot={searchSlot} />
        <SidebarInset className="relative overflow-hidden">
          <NavigationProgress />
          {/* Mobile-only, always mounted: pages render wildly different headers
              (or none while loading), so this is the one place every page is
              guaranteed to expose a way back to the sidebar. Lives in normal
              flow, not floating, so it never overlaps page content. */}
          <div className="flex h-12 shrink-0 items-center border-b px-4 md:hidden">
            <SidebarTrigger className="size-10" />
          </div>
          {children}
          <ModalRegistry />
          <SourceBackfillModal />
          {extra}
        </SidebarInset>
      </SidebarProvider>
    </DashboardGuard>
  );
}
