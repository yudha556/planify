"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  AudioWaveform,
  Command,
  LayoutDashboard,
  FolderPlus,
  Folder,
  History,
  CreditCard,
  Settings,
  FileText,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Planify Inc",
      logo: FileText,
      plan: "Enterprise",
    },
    {
      name: "Planify Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Planify Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "New Project",
      url: "/newProject",
      icon: FolderPlus,
    },
    {
      title: "My Project",
      url: "/myProject",
      icon: Folder,
    },
    {
      title: "History",
      url: "/histories",
      icon: History,
    },
  ],
  navSettings: [
    {
      title: "Billing & Coins",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Preference",
      url: "/setting",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain 
          label="Main" 
          items={data.navMain.map((item) => ({
            ...item,
            isActive: pathname === item.url, 
          }))} 
        />
        
        <NavMain 
          label="Settings" 
          items={data.navSettings.map((item) => ({
            ...item,
            isActive: pathname === item.url,
          }))} 
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}