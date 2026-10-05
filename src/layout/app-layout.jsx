import Header from "@/components/header";
import { Outlet, Link } from "react-router-dom";
import { Heart, Compass, Briefcase, ShieldCheck } from "lucide-react";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div className="grid-background" />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-2 pb-16">
        <Header />
        <div className="pt-2 animate-in fade-in-50 duration-500">
          <Outlet />
        </div>
      </main>

      {/* Modern High-End Footer */}
      <footer className="mt-20 border-t border-white/10 bg-[#0d0d12]/80 backdrop-blur-xl text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2 flex flex-col gap-3">
              <Link to="/" className="flex items-center gap-2 group w-fit">
                <img
                  src="/logo.png"
                  className="h-10 transition-transform group-hover:scale-105 duration-200"
                  alt="Hirrd Logo"
                />
              </Link>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                The modern careers platform connecting world-class talent with high-growth companies. Seamless hiring, transparent tracking, and intelligent candidate matching.
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  All systems operational
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-blue-400" />
                  Verified Opportunities
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
                <Compass size={14} className="text-indigo-400" /> Discover
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/job" className="hover:text-white transition-colors">
                    Explore All Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/saved-job" className="hover:text-white transition-colors">
                    Saved Bookmarks
                  </Link>
                </li>
                <li>
                  <Link to="/onboarding" className="hover:text-white transition-colors">
                    Change Role Preferences
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
                <Briefcase size={14} className="text-purple-400" /> Recruiters
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/post-job" className="hover:text-white transition-colors">
                    Post a New Job
                  </Link>
                </li>
                <li>
                  <Link to="/my-job" className="hover:text-white transition-colors">
                    Manage Postings & Applicants
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Hirrd Inc. Designed for the modern workforce.</p>
            <div className="flex items-center gap-1.5">
              <span>Engineered with</span>
              <Heart size={13} className="text-rose-500 fill-rose-500 inline animate-pulse" />
              <span>for dreamers & builders</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;