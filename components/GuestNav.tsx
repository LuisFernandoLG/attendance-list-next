"use client";
import Logo from "./assets/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from 'next-intl';
import { Link,  usePathname } from "./navigation";
import path from "path";

export default function GuestNav() {
  const pathName = usePathname()
  const t = useTranslations("GuestNav");
  


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
            pathName !== "/auth/login"  && <li>
            <Link href="/auth/login" className={buttonVariants({variant:"default"})}>{t("login")}</Link>
        </li>
          }
          {
            pathName !== "/auth/sign-up" && <li>
            <Link href="/auth/sign-up" className={buttonVariants({variant:"secondary"})}>{t("signUp")}</Link>
        </li>
          }
        </ul>
      </nav>
    </header>
    </>
  );
}
