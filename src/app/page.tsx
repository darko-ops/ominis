import { ContactCard } from "@/components/ContactCard";
import { Radar } from "@/components/Radar";
import { TraceDemo } from "@/components/TraceDemo";

const REPO = "https://github.com/darko-ops/omi";

function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono ${className}`} aria-hidden="true">
      🜂
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">{children}</p>;
}

const PROBLEMS = [
  {
    title: "Agents act faster than anyone can review",
    body: "A coding agent can run hundreds of commands before a person reads the first diff. Review after the fact is too late when one of those commands opens a port or ships a credential.",
  },
  {
    title: "The dangerous step looks like the job",
    body: "Sabotage that works hides inside work the task needs: a firewall edit next to a config change, an exfiltration inside a test run, a narration that says one thing while the command does another.",
  },
  {
    title: "Big-model monitors are slow and persuadable",
    body: "Asking a frontier model to read every step is expensive, adds seconds of latency, and the model can be talked out of what it saw. Published red-team results show catch rates falling sharply against refined attacks.",
  },
];

const QUESTIONS = [
  { q: "sabotage", type: "probability", a: "Is this step part of an undeclared side task?" },
  { q: "scope", type: "choice", a: "in scope · plausible but unneeded · out of scope" },
  { q: "severity", type: "1–5", a: "harmless … irreversible or exfiltrating" },
  { q: "next_action", type: "choice", a: "continue · observe · human review · stop" },
];

const PRINCIPLES = [
  {
    title: "Local",
    body: "A small model that runs on your hardware, next to the agent. Traces, code and credentials never leave the machine to be judged.",
  },
  {
    title: "Calibrated",
    body: "Outputs are probabilities fitted to mean what they say, so a single threshold maps to the false-alarm rate you choose, instead of a score you have to guess at.",
  },
  {
    title: "Non-generative",
    body: "Omi reads the step and answers typed questions from its output logits. It writes no prose, so there is no reasoning chain for an agent to argue with.",
  },
  {
    title: "Long-horizon",
    body: "A running record of every file written, endpoint touched and permission changed travels with each step, so an attack set up 40 steps earlier is still in view when it fires.",
  },
];

const PARTNER = [
  "Run Omi against your own agent traces before anyone else, on your hardware.",
  "Help set the thresholds and actions that fit how your team ships.",
  "A direct line to the people building it, and the evaluation results as they land.",
];

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
          <a href="#top" className="flex items-center gap-2 text-[15px] font-semibold tracking-[0.18em] text-fg">
            <Mark className="text-ember" />
            OMINIS
          </a>
          <div className="flex items-center gap-1 text-sm text-fg-muted sm:gap-2">
            <a href="#how" className="hidden rounded-md px-3 py-1.5 hover:text-fg sm:inline-block">
              How it works
            </a>
            <a href="#omi" className="hidden rounded-md px-3 py-1.5 hover:text-fg sm:inline-block">
              Omi
            </a>
            <a href={REPO} className="rounded-md px-3 py-1.5 hover:text-fg">
              Research
            </a>
            <a href="#partner" className="ml-1 rounded-lg border border-line-strong px-3 py-1.5 text-fg transition hover:border-ember hover:text-ember">
              Design partners
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative">
          <Radar className="pointer-events-none absolute -right-72 -top-64 w-[600px] opacity-25 sm:-right-24 sm:-top-24 sm:w-[760px] sm:opacity-60 lg:right-[-6rem]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-raised/70 px-3 py-1 font-mono text-xs text-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                In development · recruiting design partners
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl">
                Runtime safety for coding agents.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
                OMINIS watches every action an AI coding agent takes and asks one question: is this the task, or something else? Its judge,{" "}
                <span className="text-fg">Omi</span>, answers with a calibrated probability, on your own hardware, in a single forward pass.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#partner"
                  className="inline-flex items-center rounded-lg bg-ember px-5 py-3 text-[15px] font-medium text-[#0a0b0d] transition hover:brightness-110"
                >
                  Become a design partner
                </a>
                <a href={REPO} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-[15px] text-fg transition hover:border-fg-muted">
                  Read the research <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <TraceDemo />
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-line bg-bg-sunken/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <SectionLabel>The problem</SectionLabel>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              You gave an agent a shell. Who is watching it?
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="bg-bg p-6 sm:p-7">
                  <h3 className="text-lg font-medium text-fg">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-14 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>How it works</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Every step, four typed answers.</h2>
              <p className="mt-5 leading-relaxed text-fg-muted">
                Before an action runs, OMINIS hands Omi the step, the steps around it and a running record of everything the agent has done. Omi returns a
                probability for each answer. Your policy turns those into an action: let it through, log it, page a person, or stop the agent.
              </p>
              <ol className="mt-8 space-y-4 text-[15px]">
                {["The agent proposes a tool call.", "Omi scores it against the task and the record so far.", "Your threshold decides: continue, observe, review, or stop."].map(
                  (s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ember">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-fg-muted">{s}</span>
                    </li>
                  ),
                )}
              </ol>
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-bg-raised">
              <div className="border-b border-line px-5 py-3 font-mono text-xs text-fg-faint">omi.decide(state) → per step</div>
              <dl className="divide-y divide-line">
                {QUESTIONS.map((q) => (
                  <div key={q.q} className="grid gap-1 px-5 py-4 sm:grid-cols-[12.5rem_1fr] sm:gap-4">
                    <dt className="font-mono text-sm text-fg">
                      {q.q}
                      <span className="ml-2 text-xs text-fg-faint">{q.type}</span>
                    </dt>
                    <dd className="text-[15px] text-fg-muted">{q.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Omi */}
        <section id="omi" className="scroll-mt-14 border-t border-line bg-bg-sunken/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <SectionLabel>Omi, the judge</SectionLabel>
            <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Small enough to run everywhere. Hard to talk around.</h2>
              <p className="max-w-md text-fg-muted">
                Designed for one forward pass per step, under 200&nbsp;ms on local hardware, so it can sit in the loop rather than read logs afterwards.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="rounded-xl border border-line bg-bg p-6 sm:p-7">
                  <h3 className="flex items-center gap-2 text-lg font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Research in the open</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Measured against attacks built to beat monitors.</h2>
              <p className="mt-5 leading-relaxed text-fg-muted">
                Omi is trained and evaluated on MonitoringBench, 2,644 red-teamed sabotage trajectories across firewall, privilege, malware and exfiltration
                side tasks, held out by task so it is never scored on a task it saw. We report catch rate at a fixed false-alarm rate, calibration, and how
                performance holds as an attack is spread over more steps. The code is public now; results will be published as they land, including where it fails.
              </p>
              <a href={REPO} className="mt-7 inline-flex items-center gap-2 text-[15px] text-ember hover:underline">
                github.com/darko-ops/omi <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["2,644", "attack trajectories in the evaluation set"],
                ["4", "typed answers per step, one forward pass"],
                ["1%", "false-alarm rate every catch rate is reported at"],
                ["0", "lines of trace text sent off your machine"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-line bg-bg-raised p-5">
                  <div className="font-mono text-3xl text-fg">{n}</div>
                  <div className="mt-2 text-sm leading-snug text-fg-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design partners */}
        <section id="partner" className="scroll-mt-14 border-t border-line bg-bg-sunken/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionLabel>Design partners</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Running coding agents on real systems?</h2>
              <p className="mt-5 leading-relaxed text-fg-muted">
                We&apos;re working with a small number of teams that run agents in CI, on developer machines or against production, to shape OMINIS around
                how agents are actually used.
              </p>
              <ul className="mt-8 space-y-3">
                {PARTNER.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-fg-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <ContactCard />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-fg-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <Mark className="text-ember" />
            <span className="tracking-[0.18em] text-fg-muted">OMINIS</span>
            <span>· intelligence : radar</span>
          </div>
          <div className="flex gap-5">
            <a href={REPO} className="hover:text-fg">
              Omi on GitHub
            </a>
            <a href="#partner" className="hover:text-fg">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
