import { Outlet, useNavigate } from "react-router";

import { SidebarProvider } from "@/components/ui/sidebar";

import { useSession } from "@/features/auth/hooks/use-session";

import { useEffect } from "react";
import { Header } from "@/components/global/header";
import { Aside } from "@/components/global/aside";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = () => {
  const navigate = useNavigate();
  const session = useSession();

  console.log(session.data);

  useEffect(() => {
    if (session.data && !session.data?.user) {
      navigate("/auth/signin");
    }
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
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
