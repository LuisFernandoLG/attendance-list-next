"use client"
import {useTranslations} from 'next-intl';
import GuestNav from "@/components/GuestNav";

export default function Home() {
    const t = useTranslations('Index');

  return (
    <>
    <GuestNav/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <pre>
        {t('title')}
        </pre>
       
        
      </div>
    </main>
    </>
  );
}
