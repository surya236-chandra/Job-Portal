/* eslint-disable react/prop-types */
import { Heart, MapPin, Trash2, ArrowUpRight, Building2, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job?.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      await fnDeleteJob();
      onJobAction();
    }
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  // Safe snippet resolution to avoid empty string if no period is present
  const getSnippet = () => {
    if (!job?.description) return "";
    const firstPeriod = job.description.indexOf(".");
    if (firstPeriod > 0) {
      return job.description.substring(0, firstPeriod + 1);
    }
    return job.description.length > 120
      ? job.description.substring(0, 120) + "..."
      : job.description;
  };

  return (
    <Card className="group relative flex flex-col justify-between hover:border-indigo-500/40 hover:bg-[#161622]/90 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
      {loadingDeleteJob && (
        <div className="absolute top-0 left-0 right-0 z-10">
          <BarLoader width={"100%"} color="#ef4444" />
        </div>
      )}

      <div>
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between items-start gap-3">
            <Link
              to={`/job/${job?.id}`}
              className="text-lg font-bold text-white hover:text-indigo-300 transition-colors line-clamp-1 group-hover:text-indigo-200"
            >
              {job?.title}
            </Link>

            {isMyJob && (
              <button
                type="button"
                aria-label="Delete Job"
                className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer"
                onClick={handleDeleteJob}
              >
                <Trash2 size={16} />
              </button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 pb-3">
          {/* Company & Location Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {job?.company ? (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] max-w-[60%]">
                {job.company.logo_url ? (
                  <img
                    src={job.company.logo_url}
                    alt={job.company.name}
                    className="h-4 max-w-[80px] object-contain"
                  />
                ) : (
                  <Building2 size={14} className="text-slate-400" />
                )}
                <span className="text-xs font-medium text-slate-300 truncate">
                  {job.company.name}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Briefcase size={14} className="text-indigo-400" />
                <span>Job Opportunity</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              <MapPin size={12} className="text-indigo-400 shrink-0" />
              <span className="truncate max-w-[120px]">{job?.location || "Remote"}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed pt-1">
            {getSnippet()}
          </p>
        </CardContent>
      </div>

      <CardFooter className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
        <Link to={`/job/${job?.id}`} className="flex-1">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-between rounded-xl hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all group/btn"
          >
            <span className="text-xs font-medium">View Details</span>
            <ArrowUpRight size={15} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            size="icon-sm"
            className={`rounded-xl transition-all ${
              saved
                ? "bg-rose-500/15 border-rose-500/40 text-rose-500 hover:bg-rose-500/25 shadow-sm shadow-rose-500/20"
                : "hover:border-white/30 text-slate-400 hover:text-rose-400"
            }`}
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
            aria-label="Save Job"
          >
            {saved ? (
              <Heart size={16} fill="currentColor" className="text-rose-500 scale-110 transition-transform" />
            ) : (
              <Heart size={16} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
