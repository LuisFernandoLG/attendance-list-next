import { Metadata } from 'next';
import GuestNav from "@/components/GuestNav";
import { getTranslations } from 'next-intl/server';
import { HeroBanner } from '@/components/landing-page/HeroBanner';

export const metadata: Metadata = {
  "title": "Home",
  "description": "My Attendance List is a tool to take attendance lists!"
}

export default async function Home() {
    const t = await getTranslations('Index');

  return (
    <>
    <GuestNav/>
    <main className="flex min-h-screen w-full">
      <HeroBanner/>
    </main>
    </>
  );
}
