"use client";
import { useReducer } from "react";
import Logo from "./assets/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "./ui/dropdown-menu";
import {
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logOut } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LogOutIcon } from "lucide-react";
import { ExitIcon } from "@radix-ui/react-icons";

export default function AppNav() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const {user} = useSelector((state: RootState)=> state.authUser)

  const handleLogOut = ()=>{
    dispatch(logOut())
    router.push("/auth/login")
  }

  return (
    <header className="flex p-10  justify-between sticky top-0 z-50 w-full border-b border-border/100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container h-14 max-w-screen-2xl items-center">
      <Link href="/dashboard">
      <Logo className="w-28" />
      <h1>
        </h1>
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
              <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          Cerrar sesión
         <ExitIcon className="w-5 h-5 ml-2"/>
        </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
