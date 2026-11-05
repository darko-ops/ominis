import Link from "next/link";

import { ContactCard } from "@/components/ContactCard";
import { FlockCanvas } from "@/components/Flock";
import { TraceDemo } from "@/components/TraceDemo";

const RESEARCH = "/research";

const NAV = [
  { label: "Model", href: "#model" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "Research", href: RESEARCH },
];

const QUESTIONS = [
  { q: "sabotage", type: "p", a: "Is this step part of an undeclared side task?" },
  { q: "scope", type: "choice", a: "in scope · plausible but unneeded · out of scope" },
  { q: "severity", type: "1–5", a: "harmless … irreversible or exfiltrating" },
  { q: "next_action", type: "choice", a: "continue · observe · human_review · stop" },
];

const PRINCIPLES = [
  { title: "Local", body: "Runs on your hardware, next to the agent. Traces, code and credentials never leave the machine to be judged." },
  {
    title: "Calibrated",
    body: "Probabilities fitted to mean what they say, so one threshold maps to the false-alarm rate you choose instead of a score you have to guess at.",
  },
  {
    title: "Non-generative",
    body: "Omi answers typed questions from its output logits and writes no prose, so there is no reasoning chain for an agent to argue with.",
  },
  {
    title: "Long-horizon",
    body: "A running record of every file written, endpoint touched and permission changed travels with each step, so setup done 40 steps earlier is still in view when it fires.",
  },
];

const PROBLEMS = [
  ["Faster than review", "An agent can run hundreds of commands before anyone reads the first diff."],
  ["Hidden in the job", "The step that does harm sits inside work the task needs: a firewall edit next to a config change."],
  ["Hard to watch well", "A frontier model reading every step is slow, costly, and can be talked out of what it saw."],
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs text-olive">{children}</p>;
}

export default function Home() {
  return (
    <div className="overflow-x-clip">
      {/* Hero: design 2a */}
      <section className="relative h-svh min-h-[640px] overflow-hidden" aria-labelledby="hero-title">
        <FlockCanvas className="absolute inset-0 block h-full w-full" />
        <header className="relative flex items-center justify-between px-5 py-6 sm:px-12 sm:py-7">
          <span className="flex items-baseline gap-2">
            <a href="#" className="text-[22px] font-medium tracking-[-0.02em]">
              omi
            </a>
            <Link href="/ominis" className="text-xs text-fg-faint transition-colors hover:text-fg">
              by ominis
            </Link>
          </span>
          <nav aria-label="Main" className="flex gap-5 text-sm sm:gap-8">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className={`hover:text-fg-faint ${n.label === "Evaluation" ? "hidden sm:inline" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>
        </header>
        <div className="absolute bottom-24 left-1/2 flex w-[min(560px,calc(100%-40px))] -translate-x-1/2 flex-col items-center gap-[22px] text-center sm:bottom-[84px]">
          <h1 id="hero-title" className="text-[44px] leading-none font-medium tracking-[-0.045em] sm:text-[68px]">
            Every step, judged.
          </h1>
          <p className="max-w-[430px] text-[17px] leading-normal text-pretty text-fg-muted">
            A small model that watches your coding agent and flags the actions that don&apos;t belong.
          </p>
          <Link href={RESEARCH} className="rounded-full bg-fg px-[22px] py-[13px] text-[15px] text-bg transition-colors hover:bg-[#333]">
            Read the research
          </Link>
        </div>
        <div className="absolute inset-x-5 bottom-8 flex justify-between gap-4 font-mono text-[11px] text-[#555] sm:inset-x-12 sm:text-xs">
          <span>p(side task) per action</span>
          <span className="text-right">one forward pass · &lt; 200 ms · local</span>
        </div>
        <p className="sr-only">
          Illustration: thousands of routine agent actions move together; one, a curl that posts an SSH key, breaks away and is flagged with p(side task) =
          0.97, routed to human review.
        </p>
      </section>

      <main>
        {/* Problem */}
        <section className="glow border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-12 sm:py-28 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Label>the problem</Label>
              <h2 className="mt-3 text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-[40px]">You gave an agent a shell. Who&apos;s watching?</h2>
            </div>
            <dl className="glass grid divide-y divide-line/70 overflow-hidden rounded-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {PROBLEMS.map(([t, b]) => (
                <div key={t} className="p-6">
                  <dt className="font-medium">{t}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-fg-muted">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Model */}
        <section id="model" className="glow scroll-mt-4 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-12 sm:py-28 lg:grid-cols-2">
            <div>
              <Label>model</Label>
              <h2 className="mt-3 text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-[40px]">Four typed answers per step.</h2>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-fg-muted">
                Omi reads the step, the steps around it and a running record of everything the agent has done, then returns a probability for each answer.
                Your policy turns them into an action.
              </p>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {QUESTIONS.map((q) => (
                  <div key={q.q} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <dt className="font-mono text-sm">
                      {q.q} <span className="text-xs text-fg-faint">{q.type}</span>
                    </dt>
                    <dd className="text-[15px] text-fg-muted">{q.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:pt-10">
              <TraceDemo />
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-t border-line bg-bg-sunken">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-12 sm:py-28">
            <Label>design</Label>
            <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-[40px]">Small enough to run everywhere. Hard to talk around.</h2>
            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="border-t border-fg pt-5">
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evaluation */}
        <section id="evaluation" className="glow scroll-mt-4 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-12 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <Label>evaluation</Label>
              <h2 className="mt-3 text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-[40px]">Measured against attacks built to beat monitors.</h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-muted">
                Omi is trained and evaluated on MonitoringBench: red-teamed sabotage trajectories across firewall, privilege, malware and exfiltration side
                tasks, held out by task so it is never scored on a task it has seen. Catch rate is reported at a fixed false-alarm rate, alongside calibration
                and how detection holds as an attack is spread over more steps.
              </p>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-fg-muted">
                Results will be published as they land, including where it fails.
              </p>
              <Link href={RESEARCH} className="mt-7 inline-block font-mono text-sm underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                read the research note
              </Link>
            </div>
            <dl className="glass grid grid-cols-2 overflow-hidden rounded-2xl [&>div:nth-child(-n+2)]:border-b [&>div:nth-child(odd)]:border-r [&>div]:border-line/70">
              {[
                ["2,644", "attack trajectories in the evaluation set"],
                ["4", "typed answers per step, one forward pass"],
                ["1%", "false-alarm rate every catch rate is reported at"],
                ["0", "bytes of trace sent off your machine"],
              ].map(([n, l]) => (
                <div key={l} className="p-5">
                  <dt className="font-mono text-3xl tracking-tight">{n}</dt>
                  <dd className="mt-2 text-sm leading-snug text-fg-faint">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Design partners */}
        <section id="partners" className="glow scroll-mt-4 border-t border-line bg-bg-sunken">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-12 sm:py-28 lg:grid-cols-2 lg:items-center">
            <div>
              <Label>design partners</Label>
              <h2 className="mt-3 text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-[40px]">Running coding agents on real systems?</h2>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-fg-muted">
                We&apos;re working with a few teams that run agents in CI, on developer machines or against production. Run Omi on your own traces first,
                help set the thresholds, and see the results as they land.
              </p>
            </div>
            <ContactCard />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 font-mono text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <span>
            <span className="font-sans text-base font-medium tracking-[-0.02em] text-fg">omi</span> · every step, judged
          </span>
          <span className="flex gap-6">
            <Link href={RESEARCH} className="hover:text-fg">
              research
            </Link>
            <a href="#partners" className="hover:text-fg">
              contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
