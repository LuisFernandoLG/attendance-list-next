import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Skeleton } from "../ui/skeleton";
import rec from "./../../assets/images/rectangleQr.png"
import square from "./../../assets/images/squareQr.png"

export  function HeroBanner(){
  
  return <section className="flex mx-auto max-w-[1200px] mt-10">
    <article>
      <h1 id="homepage-title" className="text-5xl font-black">¡Tu herramienta de pase de lista!</h1>
      <p className="mt-5 text-xl">Toma el control de las personas que asisten a tus <span className="text-violet-700 font-bold">clases</span>, <span className="text-rose-700 font-bold">conferencias</span>, <span className="text-purple-700-700 font-bold">reuniones</span>, <span className="font-bold">etc.</span></p>
      <span className="font-bold flex items-center mt-5">Escanea alguno de los códigos de la derecha <ArrowRightIcon className="ml-2 size-5"/> </span>
    </article>
    <article className="flex gap-5 justify-center  w-full">
      <img src={rec.src} className="h-[350px] object-scale-down bg-red-300 rounded-md shadow-xl"/>
      <img src={square.src} className="h-[200px] object-scale-down  rounded-md shadow-xl"/>
    </article>
  </section>
}