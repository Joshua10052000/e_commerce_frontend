import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSession } from "@/features/auth/hooks/use-session";

const AuthLayout = () => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session.data && session.data.user) navigate("/");
  }, [session.data]);

  return (
    <article className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <section className="relative hidden before:absolute before:bottom-0 before:aspect-square before:w-full before:bg-gradient-to-t before:from-primary/75 before:to-transparent md:block">
        <img src="/placeholder.svg" className="h-full w-full object-cover" />
      </section>
      <section className="px-2">
        <Outlet />
      </section>
    </article>
  );
};

export default AuthLayout;
