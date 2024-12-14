import { Outlet, useNavigate } from "react-router";

import { SidebarProvider } from "@/components/ui/sidebar";

import { useSession } from "@/features/auth/hooks/use-session";

import { useEffect } from "react";
import { Header } from "@/components/global/header";
import { Aside } from "@/components/global/aside";
import { Toaster } from "@/components/ui/toaster";
import { LoaderIcon } from "lucide-react";

const RootLayout = () => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session.isPending) return;

    if (!session.data?.user) navigate("/auth/signin");
  }, [session.data]);

  return (
    <SidebarProvider>
      <Aside />
      <div className="relative w-full">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
        <Toaster />
        {session.isPending && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 text-white">
            <LoaderIcon className="size-10 animate-spin" />
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
