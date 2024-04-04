import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  signInUrl: "/",
  publicRoutes: "/",
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
