import { resolveHrefLang } from "@repo/i18n/src/resolveHrefLang";
import Link from "next/link";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Photo from "./Photo";

export function CommercialTypeCard({ data, index }) {
    // Calculate column span based on position in the pattern
    // Pattern: 3 items with col-span-8, then 2 items with col-span-12, repeat
    const getColumnSpan = (index) => {
        const positionInCycle = index % 5; // 5-item cycle (3 + 2)

        if (positionInCycle < 3) {
            return "col-span-full sm:col-span-4 md:col-span-4 xl:col-span-8 bg-red-500";
        } else {
            return "sm:col-span-4 xl:col-span-12 col-span-full md:col-span-6";
        }
    };

    return (
        <li className={`relative overflow-hidden ${getColumnSpan(index)} `}>
            <Link className="inset-0 z-10 absolute peer size-full grid place-content-center group hover:bg-darks-900/30 duration-500 transition-all ease-expo-in-out"
                href={resolveHrefLang(data.locale, data._type, data.slug.current)}
                title={data?.title}
            >
                {data?.client ? (
                    <div className="overflow-hidden">
                        <Paragraph className="text-center font-sans opacity-0 translate-y-full group-hover:opacity-100 duration-500 group-hover:translate-y-0 transition-all ease-expo-in-out delay-100 ">
                            {data?.client}
                        </Paragraph>
                    </div>
                ) : null}
                <div className="overflow-hidden">
                    <Heading
                        spacing="none"
                        tag="h3"
                        type="h3"
                        className="text-center opacity-0 translate-y-full group-hover:opacity-100 duration-500 group-hover:translate-y-0 transition-all ease-expo-in-out"
                    >
                        {data?.title}
                    </Heading>
                </div>
            </Link>
            <Photo image={data?.image} className="h-full w-full peer-hover:scale-110 transition duration-500 ease-expo-in-out pointer-events-none" />
        </li>
    );
}
