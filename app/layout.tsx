import "./globals.css";
import { DotsHorizontalIcon, GearIcon } from "@radix-ui/react-icons";
import { ThemeProvider } from "@/components/theme-provider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import Footer from "@/components/Footer";
import UserAvatar from "@/components/UserAvatar";
import Header from "@/components/Header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logout from "../components/Logout";
import UserMenu from "@/components/UserMenu";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Wordle",
  description: "Generated by create next app and supabse!",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id);

  const today = new Date().toISOString();

  if (session) {
    return (
      <html lang="en" className={`${inter.variable}`}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header>
              {/* {user ? ( */}
                <>
                  <div className="flex justify-center items-center gap-4">
                    <NavBar />
                    {profiles?.map((profile) => (
                      <UserAvatar key={profile.id} profile={profile} />
                    ))}
                    <UserMenu/>
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <DotsHorizontalIcon />
                         
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Settings</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Link href="/account">
                          {" "}
                          <DropdownMenuItem>Account</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Logout />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                </>
              {/* ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )} */}
            </Header>
            <main className="min-h-screen bg-background flex flex-col items-center">
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header>
            <div className="flex justify-center items-center gap-4">
              <NavBar />
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <ModeToggle />
            </div>
          </Header>
          <main className="min-h-screen bg-background flex flex-col items-center">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
