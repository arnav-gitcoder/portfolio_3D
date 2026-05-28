import React, { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-scroll";
import { socials } from "../constants";

const Navbar = () => {
  const navbarRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);

  const toplineRef = useRef(null);
  const bottomlineRef = useRef(null);

  const tl = useRef(null);
  const iconTL = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  // ---------------- GSAP ----------------

  useGSAP(() => {
    // NAVBAR INITIAL STATE

    gsap.set(navbarRef.current, {
      xPercent: 100,
    });

    gsap.set([...linksRef.current.filter(Boolean), contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    // NAVBAR TIMELINE

    tl.current = gsap.timeline({
      paused: true,
    });

    tl.current
      .to(navbarRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "<+0.3",
      );

    // BURGER ICON TIMELINE

    iconTL.current = gsap.timeline({
      paused: true,
    });

    iconTL.current
      .to(toplineRef.current, {
        rotate: 45,
        y: 4,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomlineRef.current,
        {
          rotate: -45,
          y: -4,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<",
      );
  }, []);

  // ---------------- HIDE BURGER ON SCROLL ----------------

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowBurger(false);
      } else {
        setShowBurger(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ---------------- TOGGLE MENU ----------------

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTL.current.reverse();
    } else {
      tl.current.play();
      iconTL.current.play();
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* NAVBAR */}

      <nav
        ref={navbarRef}
        className="fixed top-0 right-0 z-50 w-full h-screen flex flex-col justify-between px-10 py-28 uppercase bg-black text-white/80 gap-y-10 md:w-1/2"
      >
        {/* LINKS */}

        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-7xl">
          {["Home", "About", "Projects", "Contact"].map((section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className="transition-all duration-300 cursor-pointer hover:text-white"
                to={`${section.toLowerCase()}`}
                smooth
                offset={0}
                duration={1000}
              >
                {section}
              </Link>
            </div>
          ))}
        </div>

        {/* CONTACT */}

        <div ref={contactRef} className="flex flex-col gap-6">
          {/* EMAIL */}

          <div className="font-light">
            <p className="tracking-wider text-white/50">Email</p>

            <p className="text-xl tracking-widest lowercase">
              srivastavaarnav2004@gmail.com
            </p>
          </div>

          {/* SOCIALS */}

          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>

            <div className="flex flex-col gap-y-1">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-loose tracking-widest hover:text-white transition-all duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* BURGER BUTTON */}

      <div
        onClick={toggleMenu}
        style={{
          transform: showBurger ? "scale(1)" : "scale(0)",
        }}
        className="fixed z-[100] flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-4"
      >
        <span
          ref={toplineRef}
          className="block w-9 h-0.5 bg-white rounded-sm origin-center"
        />

        <span
          ref={bottomlineRef}
          className="block w-9 h-0.5 bg-white rounded-sm origin-center"
        />
      </div>
    </>
  );
};

export default Navbar;
