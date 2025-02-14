import { NextResponse } from "next/server";
import { getHost } from "@/lib/getHost";

export function GET(req: Request) {
    const host = getHost({ headers: Object.fromEntries(req.headers) });
    return NextResponse.json({
            host: host
        });
}

export function getHost(req?: { headers?: { host?: string } }) {
    if (typeof window !== "undefined") {
        // 클라이언트에서 실행되는 경우
        return window.location.origin;
    }

    // Vercel 환경변수 (Vercel에서 제공)
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // Netlify 환경변수 (Netlify에서 제공)
    if (process.env.URL) {
        return process.env.URL;
    }

    // Railway 환경변수 (Railway에서 제공)
    if (process.env.RAILWAY_STATIC_URL) {
        return `https://${process.env.RAILWAY_STATIC_URL}`;
    }

    // 환경변수에서 수동으로 설정한 도메인
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }

    // 서버사이드 요청에서 `Host` 헤더 읽기 (로컬 개발 환경)
    if (req?.headers?.host) {
        return `http://${req.headers.host}`;
    }

    return null; // 도메인을 찾을 수 없음
}