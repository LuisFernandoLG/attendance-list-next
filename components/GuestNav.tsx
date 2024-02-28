"use client";
import Logo from "./assets/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function GuestNav() {
  return (
    <header className="flex justify-between p-4 bg-white">
      <Logo className="w-28"/>

      <nav>
        <ul className="flex gap-2">
          <li>
              <Link href="/login" className={buttonVariants({variant:"outline"})}>Iniciar sesión</Link>
          </li>

          <li>
            
              <Link href="/login"  className={buttonVariants({variant:"default"})}>Registrarse</Link>
            
          </li>
        </ul>
      </nav>
    </header>
  );
}
