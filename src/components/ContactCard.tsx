const EMAIL = "demetri@daed.io";

const SUBJECT = "OMINIS design partner";
const BODY = [
  "Hi Demetri,",
  "",
  "Team / company:",
  "Which coding agents we run:",
  "Where they run (CI, dev machines, production):",
  "What we'd most want a monitor to catch:",
  "",
].join("\n");

const HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export function ContactCard() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-bg-raised p-6 sm:p-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">Tell us about your setup</p>
        <ul className="mt-5 space-y-3 text-[15px] text-fg-muted">
          {["Which agents you run, and how many", "Where they act: CI, developer machines, production", "What you'd most want a monitor to catch"].map((q) => (
            <li key={q} className="flex gap-3">
              <span className="font-mono text-ember" aria-hidden="true">
                ›
              </span>
              {q}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 border-t border-line pt-6">
        <a
          href={HREF}
          className="inline-flex w-full items-center justify-center rounded-lg bg-ember px-5 py-3 text-[15px] font-medium text-[#0a0b0d] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember sm:w-auto"
        >
          Request a pilot
        </a>
        <p className="mt-3 text-sm text-fg-faint">
          Opens your email app, addressed to{" "}
          <a href={`mailto:${EMAIL}`} className="text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
            {EMAIL}
          </a>
          . We reply to every message.
        </p>
      </div>
    </div>
  );
}
