import type { Metadata } from "next";
import Link from "next/link";

import { FlockCanvas } from "@/components/Flock";

export const metadata: Metadata = {
  title: "ominis: an AI security lab",
  description: "Ominis is a small AI security lab. Our first release is Omi, a local monitor that watches coding agents and flags the actions that don't belong.",
  openGraph: {
    title: "ominis: an AI security lab",
    description: "A small AI security lab. Our first release is Omi, a local monitor for coding agents.",
    type: "website",
  },
};

const CONTACT = "demetri@daed.io";

export default function Ominis() {
  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden" aria-labelledby="ominis-title">
      <FlockCanvas outlier={false} className="absolute inset-0 block h-full w-full" />
      <header className="relative flex items-center justify-between px-5 py-6 sm:px-12 sm:py-7">
        <span className="flex items-baseline gap-2">
          <a href="/ominis" className="text-[22px] font-medium tracking-[-0.02em]">
            ominis
          </a>
          <Link href="/" className="text-xs text-fg-faint transition-colors hover:text-fg">
            omi
          </Link>
        </span>
        <nav aria-label="Main" className="flex gap-5 text-sm sm:gap-8">
          <a href={`mailto:${CONTACT}`} className="hover:text-fg-faint">
            Contact
          </a>
        </nav>
      </header>
      <div className="absolute bottom-24 left-1/2 flex w-[min(560px,calc(100%-40px))] -translate-x-1/2 flex-col items-center gap-[22px] text-center sm:bottom-[84px]">
        <h1 id="ominis-title" className="text-[44px] leading-none font-medium tracking-[-0.045em] sm:text-[68px]">
          An AI security lab.
        </h1>
        <p className="max-w-[430px] text-[17px] leading-normal text-pretty text-fg-muted">
          We build small, local models that watch autonomous agents. Omi, a monitor for coding agents, is the first.
        </p>
        <Link href="/" className="rounded-full bg-fg px-[22px] py-[13px] text-[15px] text-bg transition-colors hover:bg-[#333]">
          See Omi
        </Link>
      </div>
      <div className="absolute inset-x-5 bottom-8 flex justify-between gap-4 font-mono text-[11px] text-[#555] sm:inset-x-12 sm:text-xs">
        <span>ominis</span>
        <a href={`mailto:${CONTACT}`} className="text-right hover:text-fg">
          {CONTACT}
        </a>
      </div>
      <p className="sr-only">Illustration: thousands of agent actions moving together as one flock.</p>
    </section>
  );
}
