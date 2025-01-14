import type { NextAuthConfig } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ request, auth }: { request: NextRequest; auth: { user?: unknown } | null }) {
      const isLoggedIn = !!auth?.user;
      const url = new URL(request.url); // Use URL to extract the pathname
      const isOnDashboard = url.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
