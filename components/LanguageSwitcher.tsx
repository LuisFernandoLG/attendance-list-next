"use client"

import * as React from "react"
import { ChevronDownIcon, GlobeIcon } from "@radix-ui/react-icons"
import { useLocale} from 'next-intl';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, usePathname } from "./navigation";

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathName = usePathname()
  const pathNameWithOutLocale = pathName.replace(`/${locale}`, '')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
        <GlobeIcon className="mr-1" /> {locale}
          <span className="sr-only">Interruptor de idioma</span>
          <ChevronDownIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        { locale !== "es" && <DropdownMenuItem>
          <Link locale="es"  href={pathNameWithOutLocale}>Español</Link>
        </DropdownMenuItem>
        }
        {locale !== "en" && <DropdownMenuItem>
          <Link locale="en" href={pathNameWithOutLocale}>English</Link>
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
