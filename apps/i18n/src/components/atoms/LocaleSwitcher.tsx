import Link from "next/link";
import React from "react";
import { resolveHrefLang } from "@repo/i18n/src/resolveHrefLang";
import Appconfig from "config";
import { AppConfigLocales, LanguageProps, ExtendedLanguage } from "@/types/LocaleSwitcher";
import Heading from "./Heading";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge";

/**
 *
 * @returns: En LocaleSwitcher-komponent der skifter mellem forskellige sprog
 * @example: <LocaleSwitcher locale={locale} />
 * @summary: Denne komponent bruges til at skifte mellem forskellige sprog på siden ved at navigere til en anden URL
 * @version: 1.0.0
 * @property: [locale]
 * @autor: Kasper Buchholtz
 *
 **/

const LocaleSwitcherVariants = cva('group/languageSwitcher my-auto w-fit', {
    variants: {
        position: {
            absolute: 'absolute',
            relative: 'relative',
        },
        view: {
            mobile: 'sm:hidden',
            desktop: 'hidden sm:block',
            default: ''
        },
    },

    defaultVariants: {
        position: 'relative',
        view: 'default',
    },
})

type ExtendLanguageProps = LanguageProps & VariantProps<typeof LocaleSwitcherVariants> & {
    className?: string;
}
const LocaleSwitcher = ({ locale, position, className, view }: ExtendLanguageProps) => {

    // Create a map of translations
    const translationMap: Record<string, ExtendedLanguage | undefined> = locale?._translations?.reduce((acc, translation) => {
        acc[translation?.locale] = translation;
        return acc;
    }, {} as Record<string, ExtendedLanguage>);

    // Sort locales to ensure Danish is first
    const sortedLocales = [...Appconfig.i18n.locales].sort((a, b) => {
        if (a.id === 'da') return -1;
        if (b.id === 'da') return 1;
        if (a.id < b.id) return -1;
        return 0;
    });

    return (
        <div
            className={cn(
                className,
                LocaleSwitcherVariants({
                    position,
                    view,
                }),
            )}
        >
            <ul className="flex justify-end w-full gap-1.5 uppercase">
                {sortedLocales.map((i18nLocale: AppConfigLocales, index: number) => {
                    const translation = translationMap[i18nLocale.id];
                    const href = translation
                        ? resolveHrefLang(translation.locale, translation._type, translation.slug?.current)
                        : resolveHrefLang(i18nLocale.id);
                    const isActive = locale.locale === i18nLocale.id;
                    return (
                        <React.Fragment key={i18nLocale.id}>
                            <li>
                                <Link href={href} className={`block hover:text-lights-0 transition-all ${isActive ? 'text-lights-0' : 'text-lights-0/40'}`} title={`Skift sproget til ${i18nLocale.title}`} locale={i18nLocale.id}>
                                    <Heading tag="span" type="span">
                                        {i18nLocale.id}
                                    </Heading>
                                </Link>
                            </li>
                            {index === Math.floor(sortedLocales.length / 2) - 1 && (
                                <span className="block w-[1px] h-4 my-auto bg-lights-0" />
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default LocaleSwitcher;