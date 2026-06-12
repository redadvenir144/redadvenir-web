import { SOCIALS } from "@/lib/site";

export default function SocialBar({
  className = "",
  size = "text-xl",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className={`${size} transition-transform hover:scale-110 hover:text-accent`}
        >
          <i className={`bi bi-${s.icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
