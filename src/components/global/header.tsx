import { MountainIcon } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      <section>
        <Link
          to="/"
          className="inline-flex rounded-md px-4 py-2 hover:bg-accent"
        >
          <MountainIcon />
        </Link>
      </section>
      <section className="flex flex-1 items-center justify-center"></section>
      <section></section>
    </header>
  );
};

export { Header };
