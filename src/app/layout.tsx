import { Header } from "@/components/global/header";
import auth from "@/server/actions/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const RootLayout = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: auth.getSession,
  });

  useEffect(() => {
    if (!data?.user) navigate("/auth/signin");
  }, [data?.user]);

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
