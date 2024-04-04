"use client";
import { useState } from "react";
import { SignOutButton, useSignUp } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isLoading, isAuthenticated } = useConvexAuth();

  const createNewUser = useMutation(api.user.setInitialUserUp);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isLoaded) {
      // Make a toast or something to tell the user he has to try again
      return;
    }
    if (isAuthenticated || isLoading) {
      // Make a toast or something to tell the user has to sign out first
      return;
    }
    console.log("hi");
    const completedSignUp = await signUp.create({
      username: username,
      password: password,
    });

    await setActive({ session: completedSignUp.createdSessionId });

    void createNewUser({});
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            className="text-black"
          />
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="text-black"
          />
          <button type="submit" className="bg-gray-300 text-sm">
            Submit
          </button>
        </form>
        <SignOutButton />
        <span className="text-white">
          isSignedIn: {isAuthenticated ? "true" : "false"}
        </span>
        <span className="text-white">
          isLoading: {isLoading ? "true" : "false"}
        </span>
      </div>
    </main>
  );
}
