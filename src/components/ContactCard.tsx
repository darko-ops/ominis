const EMAIL = "demetri@daed.io";

const SUBJECT = "omi design partner";
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
    <div className="rounded-2xl border border-line bg-bg-raised p-6 sm:p-8">
      <p className="font-mono text-xs text-fg-faint">tell us about your setup</p>
      <ul className="mt-4 space-y-2.5 text-[15px] text-fg-muted">
        {["Which agents you run, and how many", "Where they act: CI, developer machines, production", "What you'd most want a monitor to catch"].map((q) => (
          <li key={q} className="flex gap-3">
            <span className="font-mono text-olive" aria-hidden="true">
              →
            </span>
            {q}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <a
          href={HREF}
          className="inline-flex items-center rounded-full bg-fg px-[22px] py-[13px] text-[15px] text-bg transition-colors hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
        >
          Request a pilot
        </a>
        <span className="text-sm text-fg-faint">
          or write to{" "}
          <a href={`mailto:${EMAIL}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
            {EMAIL}
          </a>
        </span>
      </div>
    </div>
  );
}
