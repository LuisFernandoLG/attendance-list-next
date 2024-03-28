"use client";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import {  useContext, useEffect, useRef, useState } from "react";
import { QRCodesWizzardContext } from "@/contexts/QRCodeWizzardContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import QRCode from "react-qr-code";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  EyeOpenIcon,
  GlobeIcon,
  SquareIcon,
} from "@radix-ui/react-icons";

import {  toJpeg } from 'html-to-image';
import { usePathname } from "../navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Badge } from "../ui/badge";
import Link from "next/link";

export function QRCodeCardForm() {
  const { isOpen, member, closeDrawer } = useContext(QRCodesWizzardContext);
  const [attributes, setAttributes] = useState<string[]>(["name", "folio"]);
  const ref = useRef<HTMLDivElement>(null)
  const locale = useLocale()

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Check if the code is running on the client side
    if (process) {
      // Access the current page URL using window.location
      const tempUrl = `${window.location.protocol}//${window.location.host}/${locale}/attendance/${member.event_id}/${member.custom_id}`
      setCurrentUrl(tempUrl);
    }
  }, [member, locale]);

  const hasAttribute = (attribute: string) => {
    return attributes.includes(attribute);
  }

  const stringToFileName = (str: string) => {
    return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  const onButtonClick = () => {
    if (ref.current === null) {
      return
    }

    toJpeg(ref.current, { canvasHeight: 1000, canvasWidth: 1000})
      .then((dataUrl) => {
        const link = document.createElement('a')
        const name = `${stringToFileName(member.name)}-${stringToFileName(member.custom_id)}-qr-code.jpeg`
        link.download = name
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <Drawer open={isOpen} dismissible={false}>
      <DrawerContent className="p-5">
        <Card  className="m-5 max-w-[1200px] min-w-[800px] mx-auto">
          <CardHeader>
            <CardTitle>Elige el tipo de QR</CardTitle>
            <CardDescription>
              Personalia tu QR con colores, formas y elige el formato!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <section className="flex justify-between">
              <article className="flex flex-col gap-5">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Forma</h3>
                  <ToggleGroup
                    className="flex justify-start"
                    type="single"
                    variant="outline"
                    size="lg"
                    defaultValue="squar"
                  >
                    <ToggleGroupItem value="squar" aria-label="Toggle bold">
                      <SquareIcon className="h-4 w-4 mr-2" /> Cuadrado
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">Atributos</h3>
                  <ToggleGroup
                    className="flex justify-start"
                    type="multiple"
                    variant="outline"
                    size="lg"
                    defaultValue={attributes}
                    onValueChange={(values) => setAttributes(values)}

                  >
                    <ToggleGroupItem value="name" aria-label="Toggle bold">
                      Nombre
                    </ToggleGroupItem>
                    <ToggleGroupItem value="folio" aria-label="Toggle italic">
                      Folio
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                

                {/* <div>
                  <h3 className="text-2xl font-bold mb-2">Color</h3>
                  <ToggleGroup
                    className="flex justify-start"
                    type="single"
                    variant="outline"
                    size="lg"
                  >
                    <ToggleGroupItem value="red" aria-label="Toggle bold">
                      <span className="text-red-500 font-bold">Rojo</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="purple" aria-label="Toggle italic">
                      <span className="text-purple-500 font-bold">Purple</span>
                    </ToggleGroupItem>

                    <ToggleGroupItem value="rose" aria-label="Toggle italic">
                      <span className="text-rose-500 font-bold">rose</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div> */}
              </article>

<div className="rounded-3xl border p-2 flex flex-col items-center justify-center">

              <article ref={ref} className=" w-56 h-56 flex flex-col p-4 max-w-[400px] bg-white">
                <QRCode
                  size={800}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={currentUrl}
                  viewBox={`0 0 800 800`}
                />
                <div>
              { hasAttribute("name") && <h3 className="text-center text-xl font-bold mt-2 text-black">{member.custom_id}</h3>}
              { hasAttribute("folio") && <h4 className="text-center text-base text-black">{member.name}</h4> }
                </div>
              </article>

<Link href={currentUrl} target="_blank" className="mx-auto">
  <Badge className="mt-4 cursor-pointer">Vista previa <GlobeIcon/>  </Badge>
</Link>
</div>
            </section>
          </CardContent>

          <CardFooter className="mt-5 flex gap-2 justify-end">
            <Button size="lg" onClick={onButtonClick}>Descargar</Button>
            <Button size="lg" onClick={closeDrawer} variant="outline">
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
}
