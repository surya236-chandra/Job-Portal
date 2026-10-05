import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Briefcase, PlusCircle, ArrowRight } from "lucide-react";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded && user) {
      fnCreatedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  if (!isLoaded || loadingCreatedJobs) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <BarLoader width="100%" color="#6366f1" />
      </div>
    );
  }

  return (
    <div>
      {createdJobs?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {createdJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onJobAction={fnCreatedJobs}
              isMyJob
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-white/[0.08] bg-[#14141c]/60 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <Briefcase size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Active Job Postings</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            You haven&apos;t published any job opportunities yet. Create a posting to start receiving qualified applicant resumes.
          </p>
          <Link to="/post-job">
            <Button variant="blue" className="gap-2 rounded-xl">
              <PlusCircle size={16} />
              <span>Post Your First Job</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;