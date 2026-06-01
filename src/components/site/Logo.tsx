import { Link } from "@tanstack/react-router";
import logo from "@/assets/itrade-logo.png";

export function Logo({ className = "h-8 w-auto", linked = true }: { className?: string; linked?: boolean }) {
  const img = (
    <img
      src={logo}
      alt="iTrade"
      className={className}
      width={1280}
      height={853}
      decoding="async"
    />
  );
  if (!linked) return img;
  return (
    <Link to="/" className="shrink-0 inline-flex items-center" aria-label="iTrade — home">
      {img}
    </Link>
  );
}
