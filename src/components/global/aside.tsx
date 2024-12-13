import {
  ChevronRightIcon,
  UserIcon,
  LogOutIcon,
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  SettingsIcon,
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { useSession } from "@/features/auth/hooks/use-session";
import { useSignout } from "@/features/auth/hooks/use-signout";
import { useCart } from "@/features/cart/hooks/use-cart";

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
    path: "/settings",
    label: "Settings",
    icon: SettingsIcon,
    getBadge: () => 0,
  },
];

const Aside = () => {
  const sidebar = useSidebar();
  const session = useSession();
  const signOut = useSignout();

  return (
    <Sidebar collapsible="icon">
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild tooltip={link.label}>
                    <Link to={link.path} className="[&_svg]:relative">
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
              ))}
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
