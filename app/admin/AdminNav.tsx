import { auth, clerkClient, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSideBar } from "./AdminSideBar";

interface AdminNavProps {
  user: User;
}
export default async function AdminNav({ user }: AdminNavProps) {
  console.log(user);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{user ? `Welcome, ${user.firstName}` : "Guest"}</p>
    </div>
  );
}
