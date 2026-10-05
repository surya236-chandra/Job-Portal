import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  MapPin,
  Building2,
  ArrowLeft,
  Users,
  Sparkles,
  Settings,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <BarLoader className="mb-4" width="220px" color="#6366f1" />
        <p className="text-sm text-slate-400">Loading job details...</p>
      </div>
    );
  }

  const isRecruiter = job?.recruiter_id === user?.id;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-6 pb-16">
      {/* Back button */}
      <div>
        <Link
          to="/job"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to all jobs</span>
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#14141c]/80 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {job?.company && (
                <span className="text-sm font-semibold text-indigo-400 flex items-center gap-1.5">
                  <Building2 size={16} />
                  {job.company.name}
                </span>
              )}
            </div>
            <h1 className="gradient-title font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
              {job?.title}
            </h1>
          </div>

          {job?.company?.logo_url && (
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white/[0.04] border border-white/10 p-3 flex items-center justify-center shrink-0 shadow-lg">
              <img
                src={job.company.logo_url}
                className="max-h-full max-w-full object-contain"
                alt={job?.company?.name || "Company Logo"}
              />
            </div>
          )}
        </div>

        {/* Info Badges Row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 text-xs sm:text-sm font-medium">
            <MapPin size={15} className="text-indigo-400 shrink-0" />
            <span>{job?.location || "Remote"}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium">
            <Users size={15} className="text-indigo-400 shrink-0" />
            <span>{job?.applications?.length || 0} Applicants</span>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium border ${
              job?.isOpen
                ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/25 text-rose-400"
            }`}
          >
            {job?.isOpen ? (
              <>
                <DoorOpen size={15} className="text-emerald-400" />
                <span>Hiring Open</span>
              </>
            ) : (
              <>
                <DoorClosed size={15} className="text-rose-400" />
                <span>Hiring Closed</span>
              </>
            )}
          </div>
        </div>

        {/* Recruiter Hiring Status Switcher */}
        {isRecruiter && (
          <div className="mt-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Settings size={16} className="text-indigo-400" />
              <span>Job Status Control (Recruiter View):</span>
            </div>

            <div className="w-full sm:w-56">
              <Select onValueChange={handleStatusChange} defaultValue={job?.isOpen ? "open" : "closed"}>
                <SelectTrigger
                  className={`w-full font-medium ${
                    job?.isOpen
                      ? "border-emerald-500/40 text-emerald-300"
                      : "border-rose-500/40 text-rose-300"
                  }`}
                >
                  <SelectValue
                    placeholder={
                      "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <DoorOpen size={14} /> Open for Applicants
                    </span>
                  </SelectItem>
                  <SelectItem value="closed">
                    <span className="flex items-center gap-2 text-rose-400">
                      <DoorClosed size={14} /> Close Applications
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {loadingHiringStatus && (
        <BarLoader width={"100%"} color="#6366f1" />
      )}

      {/* About The Job Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#14141c]/80 backdrop-blur-xl shadow-xl flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase size={20} className="text-indigo-400" />
          <span>About the Role</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {job?.description}
        </p>
      </div>

      {/* Requirements Markdown Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#14141c]/80 backdrop-blur-xl shadow-xl flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles size={20} className="text-indigo-400" />
          <span>What We Are Looking For</span>
        </h2>

        <div className="prose prose-invert max-w-none text-slate-300">
          <MDEditor.Markdown
            source={job?.requirements}
            className="bg-transparent text-sm sm:text-base leading-relaxed"
          />
        </div>
      </div>

      {/* Candidate Apply Action */}
      {!isRecruiter && (
        <div className="flex justify-center pt-2">
          <ApplyJobDrawer
            job={job}
            user={user}
            fetchJob={fnJob}
            applied={job?.applications?.find(
              (ap) => ap.candidate_id === user?.id
            )}
          />
        </div>
      )}

      {/* Recruiter Applications Section */}
      {isRecruiter && (
        <div className="flex flex-col gap-4 pt-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Users size={22} className="text-indigo-400" />
              <span>Received Applications</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 ml-2">
                {job?.applications?.length || 0}
              </span>
            </h2>
          </div>

          {job?.applications?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {job.applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center text-slate-400 text-sm">
              No applications submitted yet for this position.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPage;