import { mutation } from "./_generated/server";

export const setInitialUserUp = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthenticated");
    }

    await ctx.db.insert("user", { clerkId: identity.tokenIdentifier });
  },
});
