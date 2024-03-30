"use client"; // Error components must be Client Components
import { TiredCat } from "@/components/illustrations/TiredCat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ eventId: string; memberCode: string }>();
  const t = useTranslations("Attendance")
  const commonT = useTranslations("common")

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen">

    <Card className="max-w-[400px] mx-5 sm:mx-auto  mt-5 shadow-md ">
      <CardHeader>
        <CardTitle>{t("notFound.title")}</CardTitle>
        <CardDescription>{t("notFound.description")}</CardDescription>
      </CardHeader>
      <CardContent>

    <div className="flex flex-col justify-center items-center">
      <TiredCat className="w-full"/>
      {/* Possible reasons */}
      <p className="text-center text-gray-600 mt-4">
        {t("notFound.explination")}
      </p>

    {/* code */}
    <Badge variant="destructive" className="mt-4">{params.memberCode}</Badge>
      

      <Button onClick={reset} className="mt-4">{commonT("tryAgain")}</Button>

    </div>
      </CardContent>
    </Card>
    </div>
  );
}

const bgImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2019%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/rect%3e%3ccircle r='75.97911975034036' cx='1160.71' cy='414.25' stroke='rgba(211%2c 20%2c 45%2c 1)' stroke-width='2.56'%3e%3c/circle%3e%3crect width='252' height='252' clip-path='url(%26quot%3b%23SvgjsClipPath2020%26quot%3b)' x='251.02' y='363.83' fill='url(%26quot%3b%23SvgjsPattern2021%26quot%3b)' transform='rotate(242.54%2c 377.02%2c 489.83)'%3e%3c/rect%3e%3crect width='112.32' height='112.32' clip-path='url(%26quot%3b%23SvgjsClipPath2022%26quot%3b)' x='815.78' y='151.42' fill='url(%26quot%3b%23SvgjsPattern2023%26quot%3b)' transform='rotate(270.16%2c 871.94%2c 207.58)'%3e%3c/rect%3e%3cpath d='M1225.08 379.25 L1288.88 349.48L1299.3676997782577 406.75269977825775z' stroke='rgba(211%2c 20%2c 45%2c 1)' stroke-width='2' stroke-dasharray='3%2c 2'%3e%3c/path%3e%3crect width='180' height='180' clip-path='url(%26quot%3b%23SvgjsClipPath2024%26quot%3b)' x='257.87' y='406.61' fill='url(%26quot%3b%23SvgjsPattern2025%26quot%3b)' transform='rotate(310.88%2c 347.87%2c 496.61)'%3e%3c/rect%3e%3cpath d='M939.63 503.5 L953.92 535.58L932.8306802044059 533.484319795594z' fill='rgba(211%2c 20%2c 45%2c 1)'%3e%3c/path%3e%3crect width='106.8' height='106.8' clip-path='url(%26quot%3b%23SvgjsClipPath2026%26quot%3b)' x='810.73' y='312.78' fill='url(%26quot%3b%23SvgjsPattern2027%26quot%3b)' transform='rotate(158.8%2c 864.13%2c 366.18)'%3e%3c/rect%3e%3cpath d='M128.73 136.57L138.55 144.8 132.67 156.18 142.48 164.41 136.61 175.79 146.42 184.02 140.54 195.39M120.89 138.14L130.7 146.37 124.83 157.75 134.64 165.98 128.76 177.36 138.57 185.59 132.7 196.97' stroke='rgba(211%2c 20%2c 45%2c 1)' stroke-width='2.04' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3cpath d='M453.26 68.67a5.6 5.6 0 1 0-10.96-2.34 5.6 5.6 0 1 0 10.96 2.34zM437.61 65.33a5.6 5.6 0 1 0-10.95-2.33 5.6 5.6 0 1 0 10.95 2.33zM421.96 62a5.6 5.6 0 1 0-10.95-2.34 5.6 5.6 0 1 0 10.95 2.34zM406.31 58.66a5.6 5.6 0 1 0-10.95-2.33 5.6 5.6 0 1 0 10.95 2.33zM487.89 59.69a5.6 5.6 0 1 0-10.95-2.34 5.6 5.6 0 1 0 10.95 2.34zM472.24 56.35a5.6 5.6 0 1 0-10.95-2.33 5.6 5.6 0 1 0 10.95 2.33zM456.59 53.02a5.6 5.6 0 1 0-10.95-2.34 5.6 5.6 0 1 0 10.95 2.34zM440.95 49.68a5.6 5.6 0 1 0-10.96-2.33 5.6 5.6 0 1 0 10.96 2.33z' stroke='rgba(211%2c 20%2c 45%2c 1)' stroke-width='2.44'%3e%3c/path%3e%3cpath d='M416.6 98.94L419.36 111.45 407.76 116.88 410.51 129.39 398.92 134.82 401.67 147.33 390.08 152.76' stroke='rgba(211%2c 20%2c 45%2c 1)' stroke-width='1' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3crect width='374.88' height='374.88' clip-path='url(%26quot%3b%23SvgjsClipPath2028%26quot%3b)' x='360.43' y='-68.41' fill='url(%26quot%3b%23SvgjsPattern2029%26quot%3b)' transform='rotate(39.58%2c 547.87%2c 119.03)'%3e%3c/rect%3e%3cpath d='M467.53999999999996 530.53 L349.89 495.15999999999997L330.409376501309 591.150623498691z' fill='rgba(211%2c 20%2c 45%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2019'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2021'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(211%2c 20%2c 45%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2020'%3e%3ccircle r='63' cx='377.02' cy='489.83'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='112.32' height='6.24' patternUnits='userSpaceOnUse' id='SvgjsPattern2023'%3e%3crect width='112.32' height='3.12' x='0' y='0' fill='rgba(211%2c 20%2c 45%2c 1)'%3e%3c/rect%3e%3crect width='112.32' height='3.12' x='0' y='3.12' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2022'%3e%3ccircle r='28.08' cx='871.94' cy='207.58'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2025'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(211%2c 20%2c 45%2c 1)' fill='none' stroke-width='1.2'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2024'%3e%3ccircle r='45' cx='347.87' cy='496.61'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='10.68' height='10.68' patternUnits='userSpaceOnUse' id='SvgjsPattern2027'%3e%3cpath d='M5.34 1L5.34 9.68M1 5.34L9.68 5.34' stroke='rgba(211%2c 20%2c 45%2c 1)' fill='none' stroke-width='2.18'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2026'%3e%3ccircle r='26.7' cx='864.13' cy='366.18'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='374.88' height='8.52' patternUnits='userSpaceOnUse' id='SvgjsPattern2029'%3e%3crect width='374.88' height='4.26' x='0' y='0' fill='rgba(211%2c 20%2c 45%2c 1)'%3e%3c/rect%3e%3crect width='374.88' height='4.26' x='0' y='4.26' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2028'%3e%3ccircle r='93.72' cx='547.87' cy='119.03'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`
