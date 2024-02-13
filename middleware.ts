import { withAuth } from "next-auth/middleware";

export default withAuth(async function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => token?.role === "ADMIN",
  },
});

export const config = { matcher: ["/admin/:path*"] };
