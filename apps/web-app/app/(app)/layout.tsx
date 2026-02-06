"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { Bell, Check, Coins, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "Project Baru",
    description: "Anda diundang ke project 'Venus'",
    time: "2 jam lalu",
    read: false,
  },
  {
    id: 2,
    title: "Pembayaran Berhasil",
    description: "Tagihan bulan ini telah lunas.",
    time: "5 jam lalu",
    read: false,
  },
  {
    id: 3,
    title: "Update System",
    description: "Maintenance server dijadwalkan besok.",
    time: "1 hari lalu",
    read: true,
  },
  {
    id: 4,
    title: "Login Baru",
    description: "Login terdeteksi dari perangkat baru.",
    time: "2 hari lalu",
    read: true,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const formatLabel = (text: string) => {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <TooltipProvider delayDuration={100}>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="sticky top-0 z-10 bg-background/10 backdrop-blur flex h-16 shrink-0 items-center gap-2 px-4 shadow-md">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => {
                  const isLast = index === segments.length - 1;
                  const href = `/${segments.slice(0, index + 1).join("/")}`;

                  return (
                    <React.Fragment key={href}>
                      {index > 0 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}

                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {formatLabel(segment)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {formatLabel(segment)}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-4">
              <Link href="/billing">
                <Button
                  variant={"outline"}
                  className="px-4 flex flex-row gap-2 items-center cursor-pointer hover:shadow-md hover:translate-y-1"
                >
                  <Coins color="blue" className="size-5" />
                  <p className="text-sm text-blue-500">35 Coins</p>
                </Button>
              </Link>

              <Link href="/newProject">
                <Button
                  variant="default"
                  className="flex flex-row items-center cursor-pointer hover:shadow-md hover:translate-y-1"
                >
                  <Plus className="text-white size-4" />
                  <p className="text-white text-md">New Project</p>
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    size="icon"
                    className="relative border-gray-500 cursor-pointer hover:shadow-md hover:translate-y-1"
                  >
                    <Bell className="size-4 text-gray-700" />
                    <span className="absolute top-2 left-4 right-2.0 h-2 w-2 rounded-full bg-red-600 ring-2 ring-background" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    <span className="text-xs text-muted-foreground">
                      2 unread
                    </span>
                  </div>
                  <Separator />

                  <ScrollArea className="h-75">
                    <div className="grid">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex flex-col items-start gap-1 p-4 text-sm hover:bg-muted/50 cursor-pointer transition-colors border-b last:border-0 ${
                            !notif.read
                              ? "bg-blue-50/50 dark:bg-blue-900/10"
                              : ""
                          }`}
                        >
                          <div className="flex w-full justify-between gap-2">
                            <span className="font-semibold text-foreground">
                              {notif.title}
                            </span>
                            {!notif.read && (
                              <span className="flex h-2 w-2 rounded-full bg-blue-600 mt-1" />
                            )}
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-xs">
                            {notif.description}
                          </p>
                          <span className="text-[10px] text-muted-foreground mt-1">
                            {notif.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator />
                  <div className="p-1">
                    <Button
                      variant="ghost"
                      className="w-full text-xs h-8 text-muted-foreground hover:text-primary"
                    >
                      <Check className="mr-2 h-3 w-3" />
                      Mark all as read
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>

          <main className="flex flex-1 flex-col px-6 py-8 bg-accent/20">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
