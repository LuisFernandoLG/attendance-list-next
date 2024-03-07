"use client";
import { useReducer } from "react";
import Logo from "./assets/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "./ui/dropdown-menu";
import {
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logOut } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AppNav() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const {user} = useSelector((state: RootState)=> state.authUser)

  const handleLogOut = ()=>{
    dispatch(logOut())
    router.push("/auth/login")
  }

  return (
    <header className="flex justify-between p-4 bg-white">
      <Link href="/dashboard">
      <Logo className="w-28" />
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogOut}>
          Cerrar sesión
        </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
