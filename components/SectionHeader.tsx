export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent-600">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold text-brand sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>}
    </div>
  );
}
