"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function UserMenu() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <DotsHorizontalIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[150px] grid gap-2 p-1">
                <Link
                  href="/account"
                  className="rounded-sm py-1.5 px-2 hover:bg-accent focus:bg-accent"
                >
                  Account
                </Link>
                <form
                  action="/auth/sign-out"
                  method="post"
                  className="rounded-sm py-1.5 px-2 hover:bg-accent focus:bg-accent"
                >
                  <button type="submit">Log out</button>
                  {/* Logout */}
                </form>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
