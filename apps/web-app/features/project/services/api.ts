/**
 * ============================================
 * BASE API CLIENT
 * Native fetch wrapper for Planify API
 * ============================================
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    code?: string
    coins?: number
}

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    body?: any
    headers?: Record<string, string>
}

function getAuthToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
}

export async function apiClient<T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const { method = "GET", body, headers = {} } = options

    const token = getAuthToken()

    const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
    }

    if (token) {
        requestHeaders["Authorization"] = `Bearer ${token}`
    }

    const config: RequestInit = {
        method,
        headers: requestHeaders,
    }

    if (body && method !== "GET") {
        config.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    const data: ApiResponse<T> = await response.json()

    if (!response.ok) {
        throw {
            status: response.status,
            success: false,
            message: data.message || "Something went wrong",
            code: data.code,
            coins: data.coins,
        }
    }

    return data
}
