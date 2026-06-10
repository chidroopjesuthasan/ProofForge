import { useState } from "react";
import { Link } from "react-router-dom";
import { publicNavGroups } from "../../data/proofForgeContent.js";
import Button from "../ui/Button.jsx";

function PublicNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--pf-line)] bg-white/95 backdrop-blur">
      <div className="pf-wide flex min-h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" onClick={close} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--pf-black)] text-sm font-black text-white">
              PF
            </div>

            <div>
              <p className="text-sm font-black tracking-tight text-[var(--pf-black)]">
                ProofForge
              </p>
              <p className="hidden text-xs text-[var(--pf-500)] sm:block">
                Verification OS
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {publicNavGroups.map((group) => (
              <div key={group.title} className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActive(group.title)}
                  onFocus={() => setActive(group.title)}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--pf-700)] hover:bg-[var(--pf-100)] hover:text-[var(--pf-black)]"
                >
                  {group.title}
                </button>

                {active === group.title && (
                  <div
                    onMouseLeave={() => setActive(null)}
                    className="absolute left-0 top-full mt-2 w-[36rem] rounded-lg border border-[var(--pf-line)] bg-white p-3 shadow-[var(--pf-shadow-lg)]"
                  >
                    <div className="grid gap-2">
                      {group.links.map(([label, desc, href]) => (
                        <a
                          key={label}
                          href={href}
                          onClick={() => setActive(null)}
                          className="rounded-md p-3 hover:bg-[var(--pf-100)]"
                        >
                          <p className="text-sm font-bold text-[var(--pf-black)]">
                            {label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[var(--pf-600)]">
                            {desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <a
              href="#roadmap"
              className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--pf-700)] hover:bg-[var(--pf-100)] hover:text-[var(--pf-black)]"
            >
              Roadmap
            </a>

            <a
              href="#enterprise"
              className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--pf-700)] hover:bg-[var(--pf-100)] hover:text-[var(--pf-black)]"
            >
              Enterprise
            </a>
          </nav>
        </div>

        <div className="hidden flex-1 justify-center px-4 lg:flex">
          <div className="w-full max-w-md rounded-md border border-[var(--pf-line)] bg-[var(--pf-100)] px-3 py-1.5 text-sm text-[var(--pf-500)]">
            Search evidence, dossiers, proofmarks...
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>

          <Link to="/register">
            <Button variant="black" size="sm">Start free</Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md border border-[var(--pf-line)] bg-white px-3 py-2 text-sm font-bold text-[var(--pf-black)] xl:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--pf-line)] bg-white xl:hidden">
          <div className="pf-container py-4">
            <div className="mb-4 rounded-md border border-[var(--pf-line)] bg-[var(--pf-100)] px-3 py-2 text-sm text-[var(--pf-500)]">
              Search ProofForge
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {publicNavGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-lg border border-[var(--pf-line)] bg-white p-3"
                >
                  <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--pf-500)]">
                    {group.title}
                  </p>

                  <div className="mt-2 space-y-1">
                    {group.links.map(([label, desc, href]) => (
                      <a
                        key={label}
                        href={href}
                        onClick={close}
                        className="block rounded-md p-2 hover:bg-[var(--pf-100)]"
                      >
                        <p className="text-sm font-bold text-[var(--pf-black)]">
                          {label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[var(--pf-600)]">
                          {desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-2 border-t border-[var(--pf-line)] pt-4 sm:grid-cols-2">
              <Link to="/login" onClick={close}>
                <Button className="w-full">Sign in</Button>
              </Link>

              <Link to="/register" onClick={close}>
                <Button className="w-full" variant="black">Start free</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNav;