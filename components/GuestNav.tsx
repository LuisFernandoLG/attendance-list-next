"use client";
import Logo from "./assets/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function GuestNav() {
  const pathName = usePathname()

  return (
    <>
    <header className="flex justify-between p-4">
    <Link href="/">
      <Logo className="w-28"/>
    </Link>

      <nav className="flex gap-2">
        <ThemeToggle/>
        <ul className="flex gap-2">
          
          {
            pathName !== "/auth/login" && <li>
            <Link href="/auth/login" className={buttonVariants({variant:"outline"})}>Iniciar sesión</Link>
        </li>
          }
          {
            pathName !== "/auth/sign-up" && <li>
            <Link href="/auth/sign-up" className={buttonVariants({variant:"secondary"})}>Registrarse</Link>
        </li>
          }
        </ul>
      </nav>
    </header>
    </>
  );
}
