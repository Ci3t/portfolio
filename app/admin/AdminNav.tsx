import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
type User = {
  id: string;
  primaryEmailAddressId?: string;
  primaryPhoneNumberId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  publicMetadata: Record<string, any>;
  privateMetadata: Record<string, any>;
  emailAddresses: Array<{
    id: string;
    emailAddress: string;
  }>;
  phoneNumbers: Array<{
    id: string;
    phoneNumber: string;
  }>;
};

export default async function AdminNav({ user }: any) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{user ? `Welcome, ${user.firstName}` : "Guest"}</p>
    </div>
  );
}
