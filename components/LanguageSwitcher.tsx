"use client"

import * as React from "react"
import { GlobeIcon } from "@radix-ui/react-icons"
import { useLocale} from 'next-intl';
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "./navigation";

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathName = usePathname()

  const pathNameWithOutLocale = pathName.replace(`/${locale}`, "")


  // TODO: when switching the language on a page with a dynamic route, it breaks because usePathName returns the path with [id] instead of the actual id
  const currentLinkInEs = `/es${pathNameWithOutLocale}`
  const currentLinkInEn = `/en${pathNameWithOutLocale}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
        {/* <GlobeIcon className="mr-1" /> {locale} */}
        <GlobeIcon className="mr-1" /> {currentLinkInEs}
          <span className="sr-only">Interruptor de idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem >
          <Link href={{ 
            pathname: '[link]',
            query: { link: currentLinkInEs }
           }}>Español</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={{ 
            pathname: '[link]',
            query: { link: currentLinkInEn }
           }}>English</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
