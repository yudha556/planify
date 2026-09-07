"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FileDown, FileText, Plus, Coins, Pencil, Trash2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getHistory } from "@/services/project.service";

const ACTION_META: Record<string, { icon: any; bgColor: string; iconColor: string; label: string }> = {
  generate_brief: {
    icon: FileText,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    label: "Generated Project Brief",
  },
  export_pdf: {
    icon: FileDown,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    label: "Exported PDF Document",
  },
  export_markdown: {
    icon: FileDown,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    label: "Exported Markdown Document",
  },
};

const FALLBACK_META = {
  icon: Plus,
  bgColor: "bg-gray-100",
  iconColor: "text-gray-600",
  label: "Activity",
};

type ActivityLog = {
  id: string;
  action: string;
  coins_used: number;
  metadata: Record<string, any>;
  created_at: string;
};

type GroupedLogs = {
  label: string;
  date: string;
  logs: ActivityLog[];
};

function groupByDate(logs: ActivityLog[]): GroupedLogs[] {
  const groups: Record<string, ActivityLog[]> = {};

  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now.getTime() - 86400000).toDateString();

  for (const log of logs) {
    const d = new Date(log.created_at);
    const key = d.toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(log);
  }

  return Object.entries(groups).map(([dateStr, items]) => {
    let label = "";
    if (dateStr === today) label = "Today";
    else if (dateStr === yesterday) label = "Yesterday";

    const d = new Date(dateStr);
    const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    return { label, date, logs: items };
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export default function Histories() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "documents" | "transactions">("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getHistory(50, 0);
        setLogs((res.data as any) || []);
      } catch (e: any) {
        setError(e.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    if (filter === "documents") return log.action === "generate_brief";
    if (filter === "transactions") return log.coins_used !== 0;
    return true;
  });

  const grouped = groupByDate(filteredLogs);

  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <div className="flex flex-row items-center gap-4">
        <Button
          variant={"outline"}
          onClick={() => setFilter("all")}
          className={`px-3 rounded-full cursor-pointer hover:shadow-md hover:translate-y-1 ${filter === "all" ? "bg-blue-600 text-white" : ""}`}
        >
          All Activity
        </Button>
        <Button
          variant={"outline"}
          onClick={() => setFilter("documents")}
          className={`px-3 rounded-full cursor-pointer hover:shadow-md hover:translate-y-1 ${filter === "documents" ? "bg-blue-600 text-white" : ""}`}
        >
          <FileText />
          Documents
        </Button>
        <Button
          variant={"outline"}
          onClick={() => setFilter("transactions")}
          className={`px-3 rounded-full cursor-pointer hover:shadow-md hover:translate-y-1 ${filter === "transactions" ? "bg-blue-600 text-white" : ""}`}
        >
          <Coins />
          Transactions
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-400 size-8" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && grouped.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FileText className="size-12 mb-4 opacity-50" />
          <p>No activity yet. Generate a project to get started!</p>
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-4 w-full">
          {grouped.map((group) => (
            <div key={group.date} className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                {group.label ? `${group.label} • ` : ""}{group.date}
              </p>

              <Card>
                <CardContent className="p-0">
                  {group.logs.map((log, idx) => {
                    const meta = ACTION_META[log.action] || FALLBACK_META;
                    const Icon = meta.icon;

                    return (
                      <div key={log.id}>
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${meta.bgColor}`}
                            >
                              <Icon className={`h-5 w-5 ${meta.iconColor}`} />
                            </div>

                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-semibold">{meta.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {log.metadata?.projectTitle || "Unknown Project"}
                                {log.metadata?.projectType ? ` · ${log.metadata.projectType}` : ""}
                              </p>
                            </div>
                          </div>

                          <div className="text-right flex flex-col gap-1">
                            <p
                              className={`text-sm font-medium ${log.coins_used > 0
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                                }`}
                            >
                              {log.coins_used === 0
                                ? "Free"
                                : `-${log.coins_used} Coins`}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {formatTime(log.created_at)}
                            </p>
                          </div>
                        </div>

                        {idx !== group.logs.length - 1 && (
                          <div className="mx-4 h-0.5 bg-gray-200 dark:bg-gray-900" />
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
