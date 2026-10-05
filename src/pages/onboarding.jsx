import { useUser } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { UserCheck, Briefcase, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [updatingRole, setUpdatingRole] = useState(false);

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/job");
  };

  const handleRoleSelection = async (role) => {
    try {
      setUpdatingRole(true);
      await user.update({
        unsafeMetadata: { role },
      });

      console.log(`Role updated to: ${role}`);
      navigateUser(role);
    } catch (err) {
      console.error("Error updating role:", err);
      setUpdatingRole(false);
    }
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded || updatingRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <BarLoader className="mb-4" width="240px" color="#6366f1" />
        <p className="text-sm text-slate-400 animate-pulse">Setting up your profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-4">
        <Sparkles size={14} className="text-indigo-400" />
        <span>Personalize Your Journey</span>
      </div>

      <h2 className="gradient-title font-extrabold text-5xl sm:text-7xl tracking-tight text-center">
        Choose Your Role
      </h2>

      <p className="text-slate-400 mt-4 text-center max-w-lg text-sm sm:text-base">
        Select how you want to experience Hirrd. You can switch or manage your preference at any time.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 sm:px-0">
        {/* Candidate Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleRoleSelection("candidate")}
          onKeyDown={(e) => e.key === "Enter" && handleRoleSelection("candidate")}
          className="group relative flex flex-col justify-between p-8 rounded-3xl border border-white/10 bg-[#14141c]/80 backdrop-blur-xl hover:border-indigo-500/60 hover:bg-[#1a1a24] hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <UserCheck size={28} />
            </div>

            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
              Candidate
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              I want to browse openings, bookmark target companies, submit resumes, and track my applications.
            </p>

            <ul className="mt-6 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-400" />
                <span>One-click application flow</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-400" />
                <span>Save favorites and alerts</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <Button
              variant="blue"
              className="w-full justify-between rounded-xl py-6 text-base font-semibold group-hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelection("candidate");
              }}
            >
              <span>Continue as Candidate</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Recruiter Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleRoleSelection("recruiter")}
          onKeyDown={(e) => e.key === "Enter" && handleRoleSelection("recruiter")}
          className="group relative flex flex-col justify-between p-8 rounded-3xl border border-white/10 bg-[#14141c]/80 backdrop-blur-xl hover:border-purple-500/60 hover:bg-[#1a1a24] hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
            </div>

            <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Recruiter
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              I am hiring talent, publishing job vacancies, reviewing resumes, and advancing candidate pipelines.
            </p>

            <ul className="mt-6 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-purple-400" />
                <span>Post & manage listings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-purple-400" />
                <span>Review & status applications</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <Button
              variant="secondary"
              className="w-full justify-between rounded-xl py-6 text-base font-semibold border-white/15 bg-purple-600 hover:bg-purple-500 text-white group-hover:shadow-lg shadow-purple-600/20"
              onClick={(e) => {
                e.stopPropagation();
                handleRoleSelection("recruiter");
              }}
            >
              <span>Continue as Recruiter</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;