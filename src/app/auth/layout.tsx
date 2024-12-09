import auth from "@/server/actions/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: auth.getSession,
  });

  useEffect(() => {
    if (data?.user) navigate("/");
  }, [data?.user]);

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
