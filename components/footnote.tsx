import Link from "next/link";

export function Footnote() {
  return (
    <div className="flex flex-row gap-2 items-center justify-center text-zinc-400 dark:text-zinc-500 text-xs">
      <span>Built with</span>
      <Link
        className="flex flex-row gap-1 items-center text-zinc-800 dark:text-zinc-100"
        href="https://www.x402.org/"
        target="_blank"
      >
        x402 protocol
      </Link>
      <span>on</span>
      <Link
        className="flex flex-row gap-1 items-center text-zinc-800 dark:text-zinc-100"
        href="https://polygon.technology/"
        target="_blank"
      >
        Polygon Amoy
      </Link>
    </div>
  );
}
