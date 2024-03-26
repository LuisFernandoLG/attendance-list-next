"use client";
import Logo from "./assets/Logo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "./ui/dropdown-menu";
import {
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logOut } from "@/redux/authSlice";
import { ThemeToggle } from "./ThemeToggle";
import { ExitIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, useRouter } from "./navigation";
import { useTranslations } from "next-intl";

export default function AppNav() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const t = useTranslations("profileMenu")

  const handleLogOut = ()=>{
    dispatch(logOut())
    router.push("/auth/login")
  }

  const handleProfile = ()=>{
    router.push("/dashboard/profile")
  }

  return (
    <header className="flex p-10  justify-between sticky top-0 z-50 w-full border-b border-border/100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container h-14 max-w-screen-2xl items-center">
      <Link href="/dashboard">
      <Logo className="w-28" />
      </Link>
      <nav>
        <ul className="flex gap-2">
          <ThemeToggle/>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
              <DropdownMenuLabel>{t("accountTitle")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>
         <MixerHorizontalIcon className="w-5 h-5 mr-2"/>
         {t("profile")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>
         <ExitIcon className="w-5 h-5 mr-2"/>
         {t("logout")}
        </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
