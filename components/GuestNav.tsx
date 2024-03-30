"use client";
import Logo from "./assets/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Link,  usePathname } from "./navigation";
import path from "path";
import { cn } from "@/lib/utils";

export default function GuestNav() {
  const pathName = usePathname()
  const t = useTranslations("GuestNav");
  


  return (
    <>
    <header className="flex justify-between p-2 px-4 sm:p-4">
    <Link href="/">
      <Logo className="w-24 sm:w-32"/>
    </Link>

      <nav className="flex gap-2">
        <LanguageSwitcher/>
        <ThemeToggle/>
        <ul className="flex gap-2">
          
          {
            pathName !== "/auth/login"  && <li>
            <Link href="/auth/login" className={buttonVariants({variant:"default"})}>{t("login")}</Link>
        </li>
          }
          {
            pathName !== "/auth/sign-up" && <li>
            <Link href="/auth/sign-up" className={cn([buttonVariants({variant:"secondary"}), "text-nowrap"])}>{t("signUp")}</Link>
        </li>
          }
        </ul>
      </nav>
    </header>
    </>
  );
}
