import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_KEY = process.env.API_KEY;

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
        const apiKey = req.headers.get("x-api-key");
        if (!apiKey || apiKey !== API_KEY) {
            return NextResponse.json(
                { error: "Unauthorized: Invalid API Key" },
                { status: 403 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
