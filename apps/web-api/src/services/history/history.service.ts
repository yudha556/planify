/**
 * ============================================
 * HISTORY SERVICE
 * Activity logging and retrieval via Supabase
 * ============================================
 */

import { supabase } from "../../config/supabase";

export type ActivityAction = "generate_brief" | "export_pdf" | "export_markdown";

export interface LogActivityInput {
    userId: string;
    projectId?: string | null;
    action: ActivityAction;
    coinsUsed: number;
    metadata?: Record<string, any>;
}

export const historyService = {
    /**
     * Log an activity
     */
    async logActivity(input: LogActivityInput) {
        const { error } = await supabase
            .from("activity_logs")
            .insert({
                user_id: input.userId,
                project_id: input.projectId || null,
                action: input.action,
                coins_used: input.coinsUsed,
                metadata: input.metadata || {},
            });

        if (error) {
            console.error("Failed to log activity:", error.message);
            // Non-blocking: don't throw, just log
        }
    },

    /**
     * Get user's activity history (paginated)
     */
    async getHistory(userId: string, limit: number = 20, offset: number = 0) {
        const { data, error, count } = await supabase
            .from("activity_logs")
            .select("*", { count: "exact" })
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) throw error;

        return {
            logs: data || [],
            total: count || 0,
            limit,
            offset,
        };
    },
};
