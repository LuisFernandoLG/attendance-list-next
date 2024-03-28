import { Metadata } from 'next';
import GuestNav from "@/components/GuestNav";
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  "title": "Home",
  "description": "My Attendance List is a tool to take attendance lists!"
}

export default async function Home() {
    const t = await getTranslations('Index');

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
