import { MountainIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/global/search-form";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const sidebar = useSidebar();

  return (
    <header className="sticky inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <section>
        <Button onClick={sidebar.toggleSidebar} variant="ghost" size="icon">
          <MountainIcon />
        </Button>
      </section>
      <section className="max-w-sm flex-1">
        <SearchForm
          onSubmit={(data) =>
            data.query.length <= 0
              ? navigate("/products")
              : navigate(`/products?search=${data.query}`)
          }
        />
      </section>
      <section></section>
    </header>
  );
};

export { Header };
