"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type WatchCinematicScrollProps = {
  primaryWatchSrc?: string;
  secondaryWatchSrc?: string;
  backgroundSrc?: string;
};

export function WatchCinematicScroll({
  primaryWatchSrc = "/image/2.png",
  secondaryWatchSrc = "/image/3.png",
  backgroundSrc = "/image/2.webp",
}: WatchCinematicScrollProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6],
    [1, 1.1, 1.15],
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [0, 0.5, 1],
  );
  const headingY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.4],
    [0, 0.5, 1],
  );

  const watchScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8],
    [0.85, 1, 1.05],
  );
  const watchOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [0, 0.6, 1],
  );
  const watchRotateY = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    [0, 12],
  );
  const watchFloatY = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    [0, -16],
  );

  const watch1Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [1, 0.5, 0],
  );
  const watch2Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [0, 0.5, 1],
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.8],
    [0, 1],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.8],
    [0, 0.6],
  );

  const exitOpacity = useTransform(
    scrollYProgress,
    [0.8, 1],
    [1, 0],
  );

  const finalHeadingOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.9, 1],
    [0, 0.6, 1],
  );
  const finalHeadingY = useTransform(
    scrollYProgress,
    [0.8, 1],
    [24, 0],
  );
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 1], [24, 0]);

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-[400vh] bg-[#0a0a0a] text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] mix-blend-soft-light">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,#ffffff1a,transparent_50%),radial-gradient(circle_at_100%_100%,#ffffff1a,transparent_55%)]" />
      </div>

      <div className="pointer-events-none fixed inset-y-0 right-6 z-30 hidden w-px bg-white/10 md:block">
        <motion.div
          className="absolute bottom-0 left-0 w-full rounded-full bg-white"
          style={{ height: progressHeight }}
        />
      </div>

      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <div className="relative h-full w-full max-w-6xl overflow-hidden rounded-none bg-transparent">
          <motion.div
            className="absolute inset-0 -z-20"
            style={{
              scale: backgroundScale,
            }}
          >
            <Image
              src={backgroundSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/90"
            style={{ opacity: overlayOpacity }}
          />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center text-center"
            style={{ opacity: exitOpacity }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <motion.div
              style={{
                opacity: headingOpacity,
                y: headingY,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="mb-4 text-xs tracking-[0.4em] text-zinc-300"
            >
              LUXOR WATCHES
            </motion.div>
            <motion.h2
              className="mb-4 text-4xl font-semibold tracking-[0.25em] uppercase sm:text-5xl md:text-6xl"
              style={{
                opacity: headingOpacity,
                y: headingY,
              }}
            >
              Luxury Of Time
            </motion.h2>
            <motion.p
              className="mb-10 max-w-xl text-sm text-zinc-400 sm:text-base"
              style={{
                opacity: subtitleOpacity,
              }}
            >
              Daytona collection designed for those who measure time in moments,
              not minutes.
            </motion.p>

            <div className="relative h-[320px] w-full max-w-md sm:h-[380px] md:h-[420px]">
              <motion.div
                className="absolute inset-x-0 bottom-10 mx-auto h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
                style={{ opacity: glowOpacity }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: watchOpacity,
                  scale: watchScale,
                  rotateY: watchRotateY,
                  y: watchFloatY,
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: watch1Opacity }}
                >
                  <Image
                    src={primaryWatchSrc}
                    alt="Primary watch"
                    fill
                    sizes="320px"
                    className="object-contain"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: watch2Opacity }}
                >
                  <Image
                    src={secondaryWatchSrc}
                    alt="Secondary watch"
                    fill
                    sizes="320px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center"
            style={{
              opacity: finalHeadingOpacity,
            }}
          >
            <motion.h3
              className="mb-4 text-3xl font-semibold uppercase tracking-[0.3em] sm:text-4xl md:text-5xl"
              style={{ y: finalHeadingY }}
            >
              Time, Refined
            </motion.h3>
            <motion.p
              className="mb-8 max-w-md text-sm text-zinc-400 sm:text-base"
              style={{ y: finalHeadingY }}
            >
              Experience a new standard of precision and presence with the
              Daytona series.
            </motion.p>
            <motion.button
              className="rounded-full bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black"
              style={{
                opacity: ctaOpacity,
                y: ctaY,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

