import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { AdminNavBar } from "@/components/AdminNavBar";
import { getProjects } from "@/lib/action";

export interface ProjectsData {
  _id: number;
  title: string;
  des: string;
  imgUrl: string;
  img_url: string;
  img_id: string;
  iconLists: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const metadata = {
  title: "RaNi's Portfolio Admin Page",
  description: "Fullstack Developer",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata?.role;
  console.log(role);

  if (role !== "admin") {
    redirect("/");
  }

  const projects: ProjectsData[] = await getProjects();

  return (
    <div className="flex flex-col dark:bg-black-100 dark:text-white">
      <AdminNavBar projects={projects || []} />
      <main className="flex-1 p-4 mt-15">{children}</main>
    </div>
  );
}
