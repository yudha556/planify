"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { Loader2 } from "lucide-react";
import { getHistory } from "@/services/project.service";

const ACTION_BADGES: Record<string, { label: string; className: string }> = {
    generate_brief: { label: "Generated", className: "bg-blue-50 text-blue-700" },
    export_pdf: { label: "Success", className: "bg-green-50 text-green-700" },
    export_markdown: { label: "Success", className: "bg-green-50 text-green-700" },
    create_project: { label: "Created", className: "bg-purple-50 text-purple-700" },
    update_project: { label: "Saved", className: "bg-blue-50 text-blue-700" },
};

const ACTION_LABELS: Record<string, string> = {
    generate_brief: "Generated PRD",
    export_pdf: "Exported PDF",
    export_markdown: "Exported Markdown",
    create_project: "Created Project",
    update_project: "Updated Project",
};

function formatDate(iso: string): string {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) {
        return `Today, ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;
    }
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentActivity() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHistory(5, 0)
            .then((res: any) => {
                if (res.success && res.data && Array.isArray(res.data)) {
                    setActivities(res.data.slice(0, 5));
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-xl font-semibold">Recent Activity</h1>
            <Table>
                <TableHeader className="bg-gray-200">
                    <TableRow>
                        <TableHead className="text-gray-700">Document</TableHead>
                        <TableHead className="text-gray-700">Activity</TableHead>
                        <TableHead className="text-gray-700">Date</TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                                <Loader2 className="animate-spin text-gray-400 size-5 mx-auto" />
                            </TableCell>
                        </TableRow>
                    )}

                    {!loading && activities.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-400 text-sm">
                                No activity yet
                            </TableCell>
                        </TableRow>
                    )}

                    {!loading && activities.map((log) => {
                        const badge = ACTION_BADGES[log.action] || { label: log.action, className: "bg-gray-50 text-gray-700" };
                        const actionLabel = ACTION_LABELS[log.action] || log.action;
                        const title = log.metadata?.projectTitle || log.metadata?.title || "Unknown";

                        return (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium">{title}</TableCell>
                                <TableCell className="text-gray-700">{actionLabel}</TableCell>
                                <TableCell className="text-gray-700">{formatDate(log.created_at)}</TableCell>
                                <TableCell>
                                    <Badge className={badge.className}>{badge.label}</Badge>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}