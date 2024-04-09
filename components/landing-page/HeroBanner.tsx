import { ArrowRightIcon } from "@radix-ui/react-icons";
import rec from "./../../assets/images/rectangleQr.png"
import square from "./../../assets/images/squareQr.png"
import { useTranslations } from "next-intl";

export  function HeroBanner(){
  const t = useTranslations('Index');
  
  return <section className="flex flex-col xl:flex-row gap-5 mx-auto max-w-[1200px] mt-10 p-5">
    <article>
      <h1 id="homepage-title" className="text-5xl text-center xl:text-left font-black bg-gradient-to-r from-purple-700 dark:to-white to-black">{t("title")}</h1>
      <p className="mt-5 px-5 sm:p-0 text-base sm:text-xl text-center sm:text-left ">{t("description")} <span className="text-violet-700 font-bold underline">{t("event1")}</span>, <span className="text-rose-700 font-bold underline">{t("event2")}</span>, <span className="text-purple-700-700 font-bold underline">{t("event3")}</span>, <span className="font-bold">etc.</span></p>
      <span className="flex flex-col xl:flex-row items-center justify-center xl:justify-start font-bold text-center mt-5 xl:text-left gap-2">{t("callToAction")} <ArrowRightIcon className="ml-2 size-5 rotate-90 xl:rotate-0"/></span>
    </article>
    <article className="flex flex-row items-start  w-max-[800px] gap-5 justify-center p-5">
      <img src={rec.src} className="w-1/2 bg-red-300 rounded-md shadow-xl"/>
      <img src={square.src} className="w-1/2 bg-red-300  rounded-md shadow-xl overflow-hidden"/>
    </article>
  </section>
}