import { RegisterAsistance } from "@/components/RegisterAsistance";
import { ConfirmationCat } from "@/components/illustrations/ConfirmationCat";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Metadata } from "next";
import {getTranslations} from 'next-intl/server';

export const metadata: Metadata = {
  "title": "Attendance",
  "description": "Hi, here you can take your attendance."
}

type Props = {
  params: {
    eventId: string;
    memberCode: string;
  };
};

async function getAttendanceInfo({
  eventId,
  memberCode,
}: {
  eventId: string;
  memberCode: string;
}) {
  const apiEndpoint = process.env.NEXT_PUBLIC_MY_ATTENDANCE_API;
  const endpoint = `${apiEndpoint}/attendance/info/${eventId}/${memberCode}`;
  
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}

export default async function Page(props: Props) {
  const t = await getTranslations('Attendance');  
  const info = await getAttendanceInfo({
    eventId: props.params.eventId,
    memberCode: props.params.memberCode,
  });


  return (
    <div
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex justify-center items-center"
    >
      <Card className="max-w-[400px] mx-5 sm:mx-auto  mt-5 shadow-md ">
        <CardHeader>
          <CardTitle>{t("found.title")}</CardTitle>
          <CardTitle className="mt-1"><span className="underline text-primary">{info.user.name}</span></CardTitle>

          <CardDescription>
            {t("found.description")}{" "}
            <span className="font-bold text-black underline">
              {info.event.name}
            </span>
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center items-center">
            <ConfirmationCat className="w-2/3" />
            {/* Possible reasons */}
            <p className="text-center text-gray-600 mt-4">
              {t("found.explination", {name:info.user.name})}
            </p>

            {/* code */}
            <RegisterAsistance/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const bgImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2292%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/rect%3e%3crect width='372' height='372' clip-path='url(%26quot%3b%23SvgjsClipPath2293%26quot%3b)' x='134.48' y='143' fill='url(%26quot%3b%23SvgjsPattern2294%26quot%3b)' transform='rotate(31.41%2c 320.48%2c 329)'%3e%3c/rect%3e%3cpath d='M420.85 437.55a5.6 5.6 0 1 0 8.99 6.68 5.6 5.6 0 1 0-8.99-6.68zM433.69 447.09a5.6 5.6 0 1 0 8.99 6.69 5.6 5.6 0 1 0-8.99-6.69zM446.53 456.64a5.6 5.6 0 1 0 8.99 6.69 5.6 5.6 0 1 0-8.99-6.69zM459.37 466.19a5.6 5.6 0 1 0 8.99 6.69 5.6 5.6 0 1 0-8.99-6.69zM385.63 431.29a5.6 5.6 0 1 0 8.99 6.68 5.6 5.6 0 1 0-8.99-6.68zM398.47 440.84a5.6 5.6 0 1 0 8.98 6.68 5.6 5.6 0 1 0-8.98-6.68zM411.31 450.38a5.6 5.6 0 1 0 8.98 6.69 5.6 5.6 0 1 0-8.98-6.69zM424.14 459.93a5.6 5.6 0 1 0 8.99 6.69 5.6 5.6 0 1 0-8.99-6.69zM350.4 425.03a5.6 5.6 0 1 0 8.99 6.68 5.6 5.6 0 1 0-8.99-6.68zM363.24 434.58a5.6 5.6 0 1 0 8.99 6.68 5.6 5.6 0 1 0-8.99-6.68zM376.08 444.13a5.6 5.6 0 1 0 8.99 6.68 5.6 5.6 0 1 0-8.99-6.68zM388.92 453.67a5.6 5.6 0 1 0 8.99 6.69 5.6 5.6 0 1 0-8.99-6.69z' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M810.95 37.57L823.76 37.87 826.27 50.43 839.07 50.74 841.58 63.3 854.39 63.6 856.9 76.16M805.81 43.69L818.61 44 821.12 56.56 833.93 56.86 836.44 69.42 849.24 69.73 851.75 82.28M800.66 49.82L813.47 50.13 815.98 62.68 828.78 62.99 831.29 75.55 844.09 75.85 846.61 88.41' stroke='rgba(243%2c 185%2c 4%2c 1)' stroke-width='1' stroke-dasharray='3%2c 3'%3e%3c/path%3e%3ccircle r='76.04470291992742' cx='987.22' cy='393.65' stroke='rgba(243%2c 185%2c 4%2c 1)' stroke-width='1.72' stroke-dasharray='2%2c 2'%3e%3c/circle%3e%3ccircle r='64.23371822126713' cx='967.97' cy='51.14' stroke='rgba(243%2c 185%2c 4%2c 1)' stroke-width='1.99' stroke-dasharray='3%2c 2'%3e%3c/circle%3e%3crect width='372.6' height='372.6' clip-path='url(%26quot%3b%23SvgjsClipPath2295%26quot%3b)' x='930.23' y='300.91' fill='url(%26quot%3b%23SvgjsPattern2296%26quot%3b)' transform='rotate(246.56%2c 1116.53%2c 487.21)'%3e%3c/rect%3e%3crect width='198.08' height='198.08' clip-path='url(%26quot%3b%23SvgjsClipPath2297%26quot%3b)' x='94.83' y='137.8' fill='url(%26quot%3b%23SvgjsPattern2298%26quot%3b)' transform='rotate(322.16%2c 193.87%2c 236.84)'%3e%3c/rect%3e%3crect width='215.2' height='215.2' clip-path='url(%26quot%3b%23SvgjsClipPath2299%26quot%3b)' x='808.77' y='190.02' fill='url(%26quot%3b%23SvgjsPattern2300%26quot%3b)' transform='rotate(202.98%2c 916.37%2c 297.62)'%3e%3c/rect%3e%3cpath d='M695.01 163.23a5.6 5.6 0 1 0-8.29 7.52 5.6 5.6 0 1 0 8.29-7.52zM683.16 173.98a5.6 5.6 0 1 0-8.29 7.53 5.6 5.6 0 1 0 8.29-7.53zM671.31 184.73a5.6 5.6 0 1 0-8.29 7.53 5.6 5.6 0 1 0 8.29-7.53zM659.46 195.48a5.6 5.6 0 1 0-8.29 7.53 5.6 5.6 0 1 0 8.29-7.53z' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M1144.99 437.13a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62zM1129.02 438.02a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62zM1113.04 438.9a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62zM1097.07 439.79a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62zM1176.06 419.39a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62zM1160.09 420.27a5.6 5.6 0 1 0-11.19 0.62 5.6 5.6 0 1 0 11.19-0.62zM1144.11 421.16a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62zM1128.13 422.04a5.6 5.6 0 1 0-11.18 0.62 5.6 5.6 0 1 0 11.18-0.62z' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/path%3e%3ccircle r='46.666666666666664' cx='960.42' cy='531.42' stroke='rgba(243%2c 185%2c 4%2c 1)' stroke-width='1' stroke-dasharray='3%2c 2'%3e%3c/circle%3e%3cpath d='M112.08 91.08a5.6 5.6 0 1 0 3.05 10.78 5.6 5.6 0 1 0-3.05-10.78zM116.44 106.48a5.6 5.6 0 1 0 3.05 10.77 5.6 5.6 0 1 0-3.05-10.77zM120.8 121.87a5.6 5.6 0 1 0 3.05 10.78 5.6 5.6 0 1 0-3.05-10.78zM125.16 137.26a5.6 5.6 0 1 0 3.05 10.78 5.6 5.6 0 1 0-3.05-10.78z' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2292'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='372' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2294'%3e%3crect width='372' height='3' x='0' y='0' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/rect%3e%3crect width='372' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2293'%3e%3ccircle r='93' cx='320.48' cy='329'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='372.6' height='8.1' patternUnits='userSpaceOnUse' id='SvgjsPattern2296'%3e%3crect width='372.6' height='4.05' x='0' y='0' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/rect%3e%3crect width='372.6' height='4.05' x='0' y='4.05' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2295'%3e%3ccircle r='93.15' cx='1116.53' cy='487.21'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='12.38' height='12.38' patternUnits='userSpaceOnUse' id='SvgjsPattern2298'%3e%3cpath d='M0 12.38L6.19 0L12.38 12.38' stroke='rgba(243%2c 185%2c 4%2c 1)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2297'%3e%3ccircle r='49.52' cx='193.87' cy='236.84'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='215.2' height='10.76' patternUnits='userSpaceOnUse' id='SvgjsPattern2300'%3e%3crect width='215.2' height='5.38' x='0' y='0' fill='rgba(243%2c 185%2c 4%2c 1)'%3e%3c/rect%3e%3crect width='215.2' height='5.38' x='0' y='5.38' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2299'%3e%3ccircle r='53.8' cx='916.37' cy='297.62'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e")`;
