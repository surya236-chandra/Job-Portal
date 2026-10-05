import { useUser } from "@clerk/react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FileText, Search, ArrowRight } from "lucide-react";

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded && user) {
      fnApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  if (!isLoaded || loadingApplications) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <BarLoader width="100%" color="#6366f1" />
      </div>
    );
  }

  return (
    <div>
      {applications?.length ? (
        <div className="flex flex-col gap-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-white/[0.08] bg-[#14141c]/60 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
            <FileText size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Applications Submitted</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            You haven&apos;t submitted any job applications yet. Discover matching roles and submit your resume to start getting interviews.
          </p>
          <Link to="/job">
            <Button variant="blue" className="gap-2 rounded-xl">
              <Search size={16} />
              <span>Explore Open Jobs</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;