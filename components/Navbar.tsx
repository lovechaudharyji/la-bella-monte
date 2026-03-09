import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[80] w-full border-b border-white/10 bg-black/20 backdrop-blur-lg backdrop-saturate-150">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 md:px-8 text-white">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-[13px] font-semibold tracking-[0.25em] uppercase hover:text-white/80 transition-colors"
          >
            LA BELLA MONTE
          </Link>
        </div>

        {/* Center: Primary nav */}
        <nav className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-[12px] font-semibold tracking-[0.25em] uppercase md:flex">
          <Link href="/" className="hover:text-white/70 transition-colors">
            Home
          </Link>
          <Link href="/men" className="hover:text-white/70 transition-colors">
            Men
          </Link>
          <Link href="/women" className="hover:text-white/70 transition-colors">
            Women
          </Link>
          <Link href="/#news" className="hover:text-white/70 transition-colors">
            News
          </Link>
        </nav>

        {/* Right: Utilities */}
        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M21.53 20.47 18 16.94a8.5 8.5 0 1 0-1.06 1.06l3.53 3.53a.75.75 0 1 0 1.06-1.06ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z" />
            </svg>
          </Link>
          <Link href="/checkout" className="hover:text-white/70 transition-colors">
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M7.5 6.75A3.75 3.75 0 0 1 11.25 3h1.5A3.75 3.75 0 0 1 16.5 6.75V7.5H19.5a.75.75 0 0 1 .737.62l1.5 9a.75.75 0 0 1-.737.88H3.75a.75.75 0 0 1-.737-.88l1.5-9A.75.75 0 0 1 5.25 7.5H7.5v-.75Zm1.5 0V7.5h6V6.75A2.25 2.25 0 0 0 12.75 4.5h-1.5A2.25 2.25 0 0 0 9 6.75Z" />
                <path d="M8.25 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-[9px] font-semibold leading-none text-white">
                1
              </span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
