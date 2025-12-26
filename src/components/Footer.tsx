import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* LEFT: LOGO */}
          <div className="inline-block">
            <h2 className="text-2xl font-bold text-white">
              Admission
            </h2>

            {/* Bridge takes SAME width as Admission */}
            <span className="block text-sm  tracking-wide opacity-90">
              Bridge
            </span>
          </div>

          {/* RIGHT: NAV LINKS (COLUMN ALWAYS) */}
          <nav className="flex flex-col gap-3 text-sm sm:text-base">
            <Link
              to="/"
              className="hover:underline underline-offset-4 transition"
            >
              Home
            </Link>

            <Link
              to="/university"
              className="hover:underline underline-offset-4 transition"
            >
              Universities
            </Link>

            <Link
              to="/compare"
              className="hover:underline underline-offset-4 transition"
            >
              Compare
            </Link>

            <Link
              to="/about"
              className="hover:underline underline-offset-4 transition"
            >
              About
            </Link>
          </nav>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-green-500 my-6" />

        {/* BOTTOM */}
        <p className="text-center text-sm opacity-90">
          © {new Date().getFullYear()} Abrar Hossain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
