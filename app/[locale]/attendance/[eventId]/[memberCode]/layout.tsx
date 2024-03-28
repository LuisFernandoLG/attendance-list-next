import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Logo from "@/components/assets/Logo";
import { Link } from "@/components/navigation";

type Props = {
  children: React.ReactNode;
}

export default function Layout(props:Props){

  return <>
  <header className="flex p-10 sticky  justify-between z-50 w-full border-b border-border/100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container h-14 max-w-screen-2xl items-center">
    <Link href="/">
    <Logo className="size-32"/>
    </Link>
    <LanguageSwitcher/>
  </header>
  {props.children}
  </>
}