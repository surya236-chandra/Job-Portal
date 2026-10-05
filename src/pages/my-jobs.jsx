/* eslint-disable react/prop-types */

import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/react";
import { BarLoader } from "react-spinners";
import { Briefcase, UserCheck } from "lucide-react";

const MyJobs = () => {
  const { user, isLoaded } = useUser();
  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <BarLoader className="mb-4" width="220px" color="#6366f1" />
        <p className="text-sm text-slate-400">Loading your profile workspace...</p>
      </div>
    );
  }

  return (
    <div className="py-6 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-3">
          {isCandidate ? <UserCheck size={13} /> : <Briefcase size={13} />}
          <span>{isCandidate ? "Candidate Dashboard" : "Recruiter Dashboard"}</span>
        </div>
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl tracking-tight">
          {isCandidate ? "My Submitted Applications" : "Manage My Job Postings"}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          {isCandidate
            ? "Monitor real-time hiring decisions, interview requests, and application progress."
            : "Review, edit, and track applicant submissions across all your posted positions."}
        </p>
      </div>

      {isCandidate ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;