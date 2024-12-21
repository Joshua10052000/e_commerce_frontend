import {
  ChevronRightIcon,
  UserIcon,
  LogOutIcon,
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  SettingsIcon,
  HeartIcon,
  ReceiptTextIcon,
  LucideIcon,
  ComputerIcon,
  BlocksIcon,
  ShirtIcon,
  VolleyballIcon,
  ActivityIcon,
  SofaIcon,
  LibraryBigIcon,
} from "lucide-react";
import { Link } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  SidebarMenuBadge,
  useSidebar,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks/use-session";
import { useSignout } from "@/features/auth/hooks/use-signout";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useWishlists } from "@/features/wishlist/hooks/use-wishlists";
import { Category } from "@/features/categories/types";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useOrders } from "@/features/orders/hooks/use-orders";

const links = [
  { path: "/", label: "Home", icon: HomeIcon, getBadge: () => 0 },
  {
    path: "/products",
    label: "Products",
    icon: PackageIcon,
    getBadge: () => 0,
  },
  {
    path: "/cart",
    label: "Cart",
    icon: ShoppingCartIcon,
    getBadge: () => {
      const cart = useCart();

      return cart.data?.cart.cartItems.length || 0;
    },
  },
  {
    path: "/products?user-wishlists=",
    label: "Wishlists",
    icon: HeartIcon,
    getBadge: () => {
      const wishlists = useWishlists();

      return wishlists.data?.wishlists.length || 0;
    },
  },
  {
    path: "/orders",
    label: "Orders",
    icon: ReceiptTextIcon,
    getBadge: () => {
      const orders = useOrders();
      const allOrders = orders.data ? orders.data.orders : [];

      return allOrders.length;
    },
  },
  {
    path: "/settings",
    label: "Settings",
    icon: SettingsIcon,
    getBadge: () => 0,
  },
];

const sidebarCategories = (categories: Category[]) => {
  const iconMap = new Map<Category["name"], LucideIcon>([
    ["electronics_and_gadgets", ComputerIcon],
    ["toys_and_games", BlocksIcon],
    ["fashion_and_apparel", ShirtIcon],
    ["sports_and_outdoors", VolleyballIcon],
    ["health_and_beauty", ActivityIcon],
    ["home_and_living", SofaIcon],
    ["books_and_stationery", LibraryBigIcon],
  ]);

  const sidebarCategories = categories.filter((category) =>
    iconMap.get(category.name),
  );

  return sidebarCategories.map((category) => ({
    ...category,
    icon: iconMap.get(category.name)!,
  }));
};

const Aside = () => {
  const sidebar = useSidebar();
  const session = useSession();
  const signOut = useSignout();
  const categories = useCategories();

  return (
    <Sidebar collapsible="icon">
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                return (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton asChild tooltip={link.label}>
                      <Link
                        to={
                          link.label.includes("Wishlists")
                            ? `${link.path}${session.data?.user?.id}`
                            : link.path
                        }
                        className="[&_svg]:relative"
                      >
                        <link.icon />
                        <span
                          hidden={sidebar.open}
                          className="absolute right-1 top-1 bg-white font-semibold leading-none text-primary dark:bg-black"
                        >
                          {link.getBadge() || ""}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{link.getBadge() || ""}</SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.isPending
                ? Array.from({ length: 7 }, (_, i) => (
                    <SidebarMenuSkeleton key={i} />
                  ))
                : sidebarCategories(categories.data?.categories || []).map(
                    (category) => {
                      const categoryName = category.name
                        .split("_")
                        .map((word) => {
                          return word.replace("and", "&");
                        })
                        .join(" ");

                      const CategoryName: FC<
                        HTMLAttributes<HTMLSpanElement>
                      > = ({ className, children, ...props }) => {
                        return (
                          <span
                            className={cn("capitalize", className)}
                            {...props}
                          >
                            {children}
                          </span>
                        );
                      };

                      return (
                        <SidebarMenuItem key={category.id}>
                          <SidebarMenuButton
                            asChild
                            tooltip={{
                              children: (
                                <CategoryName>{categoryName}</CategoryName>
                              ),
                            }}
                          >
                            <Link
                              to={`/products?category-name=${category.name}`}
                            >
                              <category.icon />
                              <CategoryName>{categoryName}</CategoryName>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    },
                  )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="size-4">
                      <AvatarFallback>
                        {session.data?.user?.name.charAt(0)}
                      </AvatarFallback>
                      <AvatarImage src="/placeholder.svg" />
                    </Avatar>
                    <span className="text-nowrap">
                      {session.data?.user?.name}
                    </span>
                    <ChevronRightIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  <DropdownMenuItem>
                    <UserIcon />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <LogOutIcon />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure to sign out?</DialogTitle>
                  <DialogDescription>
                    By clicking continue you will signing out and redirect into
                    signin page.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button disabled={signOut.isPending}>Cancel</Button>
                  </DialogClose>
                  <Button
                    disabled={signOut.isPending}
                    variant="destructive"
                    onClick={() => signOut.mutate()}
                  >
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export { Aside };
