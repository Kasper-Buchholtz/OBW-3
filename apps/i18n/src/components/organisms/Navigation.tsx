"use client"
import React from 'react'
import { motion } from 'motion/react'
import LocaleSwitcher from '../atoms/LocaleSwitcher'
import useNavigationData from '@/hooks/useNavigationData'
import NavigationItem from '../atoms/NavigationItem'
/**
 *
 * @returns: Navigationen for hjemmesiden.
 * @example: <Navigation />
 * @alias: Navigation
 * @summary: Denne komponent bruges til at vise navigationen for hjemmesiden.
 * @version: 1.0.0
 * @property: [onClose]
 * @author: Kasper Buchholtz
 *
 **/


/* export default function Navigation({ onClose, locale }) {
  const data = useNavigationData(locale);

  return (
    <>
      <motion.nav
        role="navigation"
        data-lenis-prevent="true"
        initial={{ x: '100%' }}
        transition={{ stiffness: 100 }}
        animate={{ x: 0 }}
        exit={{ x: '100%', opacity: 0 }}
        className="fixed z-[999] top-0 right-0 w-screen h-screen sm:w-[50vw] md:w-[50vw] lg:w-[33vw] overflow-auto bg-superego-light-light"
      >
        <ul className="h-full px-6 pb-6 space-y-6 overflow-auto md:px-24 lg:px-19 xl:px-16 sm:px-13 pt-44 sm:pt-32 md:pt-28 lg:pt-28 text-medium">
          {data?.links?.map((item, index) => (
            <NavigationItem key={index} item={item} />
          ))}
          <LocaleSwitcher className="bottom-4 right-4" position="absolute" view="mobile" locale={locale} />
        </ul>
      </motion.nav>
      <motion.button
        title="Luk menu"
        className="fixed z-[998] top-0 right-0 w-screen h-screen bg-superego-dark/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, stiffness: 100 }}
        onClick={onClose}
      />
    </>
  );
}
*/










import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Section from '../sections/Section'
import Noise from '../interactions/Noise'
import Link from 'next/link'
import { ArrowDown } from '@mynaui/icons-react'
import { ArrowTopRightIcon } from '@sanity/icons'

const navItems = [
  { label: "About", href: "/about" },
  {
    label: "Work",
    href: "#",
    subLinks: [
      {
        label: "Fictional",
        href: "/work/fictional"
      },
      {
        label: "Commercial",
        href: "/work/commercial"
      },
      {
        label: "Musical",
        href: "/work/musical"
      }
    ]
  },
  { label: "Contact", href: "#" },
];

const Navigation = ({ isOpen, handleClick, locale }) => {
  const navRef = useRef(null);
  const navItemsRef = useRef(null);
  const buttonRef = useRef(null);
  const [openSubmenus, setOpenSubmenus] = useState({}); // Manage open submenus state

  useEffect(() => {
    if (isOpen) {
      // Animate the main navigation menu open
      gsap.set(navItemsRef.current.children, {
        opacity: 0,
        y: 20,
      })
      gsap.fromTo(
        navRef.current,
        { clipPath: "polygon(0% 0%, 0% 0%, 100% 100%, 100% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.7,
          ease: "expo.inOut",
          onStart: () => {
            gsap.set(navRef.current, { visibility: "visible" });
            gsap.fromTo(
              buttonRef.current,
              { opacity: 0, visibility: "hidden" },
              {
                opacity: 1,
                duration: 0.5,
                ease: "expo.out",
                visibility: "visible",
              }
            );
          },
          onComplete: () => {
            gsap.to(navItemsRef.current.children, {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: "expo.inOut",

            });
          },
        }
      );
    } else {
      // Animate the main navigation menu close
      gsap.to(navItemsRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "expo.inOut",
      });

      // Close all open submenus when main navigation closes
      Object.keys(openSubmenus).forEach((index) => {
        if (openSubmenus[index]) {
          const submenu = document.querySelectorAll(`.submenu-${index}`)[0];
          const submenuItems = submenu.children;

          gsap.to(submenuItems, {
            x: -100,
            opacity: 0,
            duration: 0.5,
            ease: "expo.inOut",
            stagger: 0.1, // Stagger effect for closing
          });

          setTimeout(() => {
            // Ensure height is reset after animation
            gsap.set(submenu, {});
          }, 500); // Delay matching the animation duration
        }
      });

      gsap.to(navRef.current, {
        clipPath: "polygon(0% 0%, 0% 0%, 100% 100%, 100% 100%)",
        duration: 0.7,
        ease: "expo.inOut",
        delay: 0.5,
        onComplete: () => {
          gsap.set(navRef.current, { visibility: "hidden" });
        },
      });

      gsap.to(buttonRef.current, {
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        ease: "expo.inOut",
      });

      // Reset all open submenus state
      setOpenSubmenus({});
    }
  }, [isOpen]);

  // Handle submenu toggle with animation
  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    const submenu = document.querySelectorAll(`.submenu-${index}`)[0];
    const submenuItems = submenu.children;

    if (!openSubmenus[index]) {
      // Open submenu: animate children with stagger
      gsap.fromTo(
        submenuItems,
        { x: -100, opacity: 0 }, // Initially off-screen
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "expo.inOut",
          stagger: 0.1, // Stagger effect for opening
        }
      );

      gsap.to(submenu, {
        opacity: 1, // Show submenu
        duration: 0.5,
        ease: "expo.inOut",
      });
    } else {
      // Close submenu: animate children with stagger
      gsap.to(submenuItems, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        stagger: 0.1, // Stagger effect for closing
      });

      gsap.to(submenu, {
        opacity: 0, // Hide submenu
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{ visibility: "hidden" }}
        className="fixed top-0 left-0 z-50 flex w-full h-full pt-20 font-serif bg-darks-900 nav se-grid"
      >
        <div className='absolute inset-0 pointer-events-none size-full'>
          <Noise
            patternSize={100}
            patternScaleX={2.5}
            patternScaleY={2.9}
            patternRefreshInterval={2}
            patternAlpha={20}
          /></div>

        <Section variant='none' className='w-full'>
          <ul ref={navItemsRef} className="w-full max-w-lg col-start-2 mt-auto mb-auto mr-auto -space-y-2 h-fit -col-end-1 col-span-full">
            {navItems.map((item, index) => (
              <li key={item.label}>
                {item.subLinks ? (
                  <React.Fragment>
                    {/* Clicking this button toggles the submenu */}
                    <button
                      className={`text-mombo transition-colors ease-expo-in-out hover:text-lights-0  ${openSubmenus[index] ? "text-lights-0" : "text-shadow-0"}`}
                      onClick={() => toggleSubmenu(index)}
                    >
                      {item.label}
                    </button>
                    <ul
                      className={`submenu-${index} absolute overflow-hidden translate-x-full pl-24 -translate-y-1/2 -right-0 top-1/2 `}
                      style={{ opacity: 0 }}
                    >
                      <li className='absolute top-1/2 left-0 bg-white block w-px h-full translate-x-1/2 -translate-y-1/2' />
                      {item.subLinks.map((subItem) => (
                        <li key={subItem.label}>
                          <Link className="w-full flex gap-3 duration-500 text-lights-0 text-large" href={subItem.href}>
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                ) : (
                  <Link className="hover:text-lights-0 duration-500 ease-expo-in-out w-full text-mombo text-shadow-0" href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Section>
        <div className="absolute overflow-hidden font-sans bottom-4 right-4 text-lights-400 text-[9px]">
          <Link target="_blank" href="https://kasperbuchholtz.dk">Website by Kasperbuchholtz.dk</Link> og <Link target="_blank" href="https://www.emiliehjoellund.dk/">Emiliehjoellund.dk</Link>
        </div>
      </nav>
      <button
        ref={buttonRef}
        style={{ visibility: "hidden" }}
        onClick={handleClick}
        className={`fixed z-40 w-full h-full bg-black/20 backdrop-blur-sm ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
    </>
  );
};

export default Navigation;
