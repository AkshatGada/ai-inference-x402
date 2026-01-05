import Link from "next/link";

export function StarButton() {
  return (
    <Link
      href="https://github.com/x402-protocol/x402"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-300"
    >
      <span className="hidden sm:inline">x402 on GitHub</span>
    </Link>
  );
}
