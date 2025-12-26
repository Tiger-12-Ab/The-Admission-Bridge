import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "University", path: "/university" },
  { name: "Compare", path: "/compare" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  // ✅ AUTH CHECK (Supabase OR backend JWT)
  const isAuthenticated =
    Boolean(localStorage.getItem("token")) ||
    Object.keys(localStorage).some((key) =>
      key.endsWith("-auth-token")
    );

  // Close drawer when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="inline-flex flex-col items-center leading-none cursor-pointer"
          >
            <span className="text-green-600 font-bold text-xl">
              Admission
            </span>
            <span className="w-full mt-0.5 text-xs font-light tracking-widest text-gray-500 text-center">
              Bridge
            </span>
          </Link>

          {/* CENTER NAV (LG+) */}
          <nav className="hidden lg:flex gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition
                    ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT BUTTON (LG+) */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-green-600 text-green-600 font-medium hover:bg-green-50 transition cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>

          {/* HAMBURGER (SM / MD) */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-gray-700 cursor-pointer"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}

      {/* MOBILE DRAWER */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* DRAWER HEADER */}
        <div className="p-4 border-b">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="inline-flex flex-col items-center leading-none"
          >
            <span className="text-green-600 font-bold text-lg">
              Admission
            </span>
            <span className="w-full mt-0.5 text-xs font-light tracking-widest text-gray-500 text-center">
              Bridge
            </span>
          </Link>
        </div>

        {/* DRAWER LINKS */}
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition
                  ${
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* DRAWER BUTTON */}
        <div className="p-4 border-t">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-lg border border-green-600 text-green-600 font-medium hover:bg-green-50 transition cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
