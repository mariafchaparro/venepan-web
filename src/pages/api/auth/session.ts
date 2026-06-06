import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    return new Response(
        JSON.stringify({ authenticated: !!(accessToken && refreshToken) }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate",
            },
        },
    );
};
