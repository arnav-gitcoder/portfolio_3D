import React, { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor = "text-black",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const titleParts = title.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top 80%",
          }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div
      ref={contextRef}
      className="relative z-10 flex flex-col justify-between min-h-screen"
    >
      {/* HEADER */}
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div
          ref={headerRef}
          className="flex flex-col justify-center px-6 pt-20 md:px-10"
        >
          {/* SUBTITLE */}
          <p
            className={`
              mb-8
              text-xs
              md:text-sm
              font-light
              tracking-[0.5rem]
              uppercase
              ${textColor}
            `}
          >
            {subTitle}
          </p>

          {/* TITLE */}
          <h1
            className={`
              uppercase
              font-normal
              tracking-tight
              leading-[0.82]
              ${textColor}
            `}
            style={{
              fontSize: "clamp(4rem, 11vw, 10rem)",
            }}
          >
            <span className="block">{titleParts[0]}</span>

            {titleParts.length > 1 && (
              <span className="block">
                {titleParts.slice(1).join(" ")}
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className={`relative px-6 md:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t border-black" />

        <div className="flex justify-end py-10 md:py-14">
          <AnimatedTextLines
            text={text}
            className="
              max-w-5xl
              text-right
              uppercase
              font-light
              tracking-wide
              text-xl
              md:text-2xl
              lg:text-3xl
            "
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;