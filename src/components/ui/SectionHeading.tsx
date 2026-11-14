interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  index,
  label,
  title,
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const toneClasses =
    tone === "light" ? "text-graphite" : "text-bone";

  return (
    <div className={`${toneClasses} ${className}`}>
      <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em]">
        <span className={tone === "light" ? "text-accent" : "text-accent-bright"}>{index}</span>
        <span>{label}</span>
        <span className="h-px flex-1 bg-current opacity-20" aria-hidden="true" />
      </div>
      <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
