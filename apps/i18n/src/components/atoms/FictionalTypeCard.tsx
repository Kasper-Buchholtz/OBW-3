import { resolveHrefLang } from "@repo/i18n/src/resolveHrefLang";
import Link from "next/link";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Photo from "./Photo";
import { clean } from "@/utils/sanitize";
import { useParams } from "next/navigation";

export function FictionalTypeCard({ data, index }) {
    return (
        <li className={`relative overflow-hidden col-span-full  max-h-screen/2.5`}>
            <Link className=" flex justify-between px-11 items-center inset-0 z-10 absolute peer size-full group hover:bg-darks-900/30 duration-500 transition-all ease-expo-in-out"
                href={clean(resolveHrefLang(data.locale, data._type, data.slug.current))}
                title={data?.title}
            >
                {data?.releaseYear ? (
                    <div className="overflow-hidden">
                        <Heading tag="span" type="h3" className="text-center font-sans ">
                            {data?.releaseYear}
                        </Heading>
                    </div>
                ) : null}
                <Heading
                    spacing="none"
                    tag="h3"
                    type="h3"
                    className="text-center  "
                >
                    {data?.title}
                </Heading>
                <div></div>
            </Link>
            <Photo image={data?.image} className="h-full w-full peer-hover:scale-110 transition duration-500 ease-expo-in-out pointer-events-none" />

        </li>
    );
}
