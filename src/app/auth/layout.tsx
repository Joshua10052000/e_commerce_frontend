import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSession } from "@/features/auth/hooks/use-session";
import { Loader } from "lucide-react";

const AuthLayout = () => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session.isPending) return;

    if (session.data?.user) navigate("/");
  }, [session.data]);

  return (
    <article className="relative grid min-h-screen grid-cols-1 md:grid-cols-2">
      <section className="relative hidden before:absolute before:bottom-0 before:aspect-square before:w-full before:bg-gradient-to-t before:from-primary/75 before:to-transparent md:block">
        <img src="/placeholder.svg" className="h-full w-full object-cover" />
      </section>
      <section className="px-2">
        <Outlet />
      </section>
      {session.isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white duration-75 animate-in">
          <Loader className="size-10 animate-spin" />
        </div>
      )}
    </article>
  );
};

export default AuthLayout;
