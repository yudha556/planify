"use client"

import { useState, useEffect } from "react"

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { ArrowRight, Coins, Download, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import RecentProject from "./components/recentProject";
import RecentActivity from "./components/recentActivity";
import { getUser, getCoins, getProjects } from "@/services/project.service";

export default function DashboardPage() {
  const router = useRouter()

  const [userName, setUserName] = useState<string>("")
  const [coinBalance, setCoinBalance] = useState<number>(0)
  const [projectCount, setProjectCount] = useState<number>(0)

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.success && res.data) {
          setUserName(res.data.fullname || res.data.email?.split("@")[0] || "User")
        }
      })
      .catch(() => { })

    getCoins()
      .then((res) => {
        if (res.success && res.data) {
          setCoinBalance(res.data.credits)
        }
      })
      .catch(() => { })

    getProjects()
      .then((res: any) => {
        if (res.success && res.data && Array.isArray(res.data)) {
          setProjectCount(res.data.length)
        }
      })
      .catch(() => { })
  }, [])

  return (
    <div className="flex flex-col gap-10 w-full h-full py-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
        <p className="text-gray-500 text-sm">
          Here's an overview of your research projects and documentation.
        </p>
      </div>

      <div className="flex flex-row gap-6  items-center justify-between w-full">
        <Card className="p-4 flex flex-col gap-8 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-gray-500 text-sm">Active Projects</p>
            <div className="w-8 h-8 rounded-sm bg-blue-100 items-center flex justify-center">
              <FolderOpen className="text-blue-600 size-5" />
            </div>
          </div>
          <h1 className="text-black text-5xl font-semibold mr-auto">{projectCount}</h1>

          <Button
            onClick={() => router.push("/myProject")}
            variant="link"
            className="flex flex-row gap-3 text-blue-600 cursor-pointer mr-auto"
          >
            View all projects
            <ArrowRight className="text-blue-600 size-4" />
          </Button>
        </Card>
        <Card className="p-4 flex flex-col gap-8 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-gray-500 text-sm">Available Coins</p>
            <div className="w-8 h-8 rounded-sm bg-yellow-100 items-center flex justify-center">
              <Coins className="text-yellow-600 size-5" />
            </div>
          </div>
          <h1 className="text-black text-5xl font-semibold mr-auto">{coinBalance}</h1>

          <Button
            onClick={() => router.push("/billing")}
            variant="link"
            className="flex flex-row gap-3 text-blue-600 cursor-pointer mr-auto"
          >
            Top up wallet
            <ArrowRight className="text-blue-600 size-4" />
          </Button>
        </Card>
        <Card className="p-4 flex flex-col gap-8 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-gray-500 text-sm">Download this month</p>
            <div className="w-8 h-8 rounded-sm bg-green-100 items-center flex justify-center">
              <Download className="text-green-600 size-5" />
            </div>
          </div>
          <h1 className="text-black text-5xl font-semibold mr-auto">14</h1>

          <Button
            onClick={() => router.push("/histories")}
            variant="link"
            className="flex flex-row gap-3 text-blue-600 cursor-pointer mr-auto"
          >
            View history
            <ArrowRight className="text-blue-600 size-4" />
          </Button>
        </Card>
      </div>

      <RecentProject />
      <RecentActivity />
    </div>
  );
}
