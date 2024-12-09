import { Header } from "@/components/global/header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSession } from "@/features/auth/hooks/use-session";

const RootLayout = () => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user) navigate("/auth/signin");
  }, [session.data?.user]);

  return (
    <article className="bg-background font-sans antialiased">
      <Header />
      <main className="min-h-screen px-4 pt-16 md:px-8">
        <Outlet />
      </main>
    </article>
  );
};

export default RootLayout;
