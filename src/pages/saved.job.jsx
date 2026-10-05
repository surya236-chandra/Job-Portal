import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Heart, Search, ArrowRight } from "lucide-react";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <BarLoader className="mb-4" width="220px" color="#6366f1" />
        <p className="text-sm text-slate-400">Loading saved bookmarks...</p>
      </div>
    );
  }

  return (
    <div className="py-6 pb-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium mb-3">
          <Heart size={13} className="text-rose-400 fill-rose-400" />
          <span>Personal Bookmarks</span>
        </div>
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl tracking-tight">
          Saved Job Listings
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Keep track of roles you want to review or apply for later.
        </p>
      </div>

      {loadingSavedJobs === false && (
        <>
          {savedJobs?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedJobs.map((saved) => (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-white/[0.08] bg-[#14141c]/60 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Saved Jobs Yet</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                You haven&apos;t bookmarked any jobs yet. Browse available positions and tap the heart icon on any listing to save it here.
              </p>
              <Link to="/job">
                <Button variant="blue" className="gap-2 rounded-xl">
                  <Search size={16} />
                  <span>Discover Opportunities</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedJobs;