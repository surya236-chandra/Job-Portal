import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import {
  Search,
  MapPin,
  Building2,
  RotateCcw,
  Briefcase,
  Sparkles,
  Filter,
} from "lucide-react";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query !== null) setSearchQuery(query.trim());
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  const hasActiveFilters = Boolean(searchQuery || location || company_id);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <BarLoader className="mb-4" width="220px" color="#6366f1" />
        <p className="text-sm text-slate-400">Loading career listings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header section */}
      <div className="text-center pt-4 sm:pt-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-3">
          <Sparkles size={13} />
          <span>Curated Tech Opportunities</span>
        </div>
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl tracking-tight">
          Explore Latest Jobs
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Find your next high-impact role across top tech brands, fast-moving startups, and remote teams.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="p-4 sm:p-5 rounded-3xl border border-white/10 bg-[#14141c]/80 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
        {/* Search Input Row */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row w-full gap-3 items-center"
        >
          <div className="relative flex-1 w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Search by job title, keywords or skills..."
              name="search-query"
              defaultValue={searchQuery}
              className="h-12 pl-10 pr-4 text-sm sm:text-base rounded-2xl bg-white/[0.04] border-white/10"
            />
          </div>

          <Button
            type="submit"
            variant="blue"
            className="h-12 w-full sm:w-36 rounded-2xl gap-2 font-semibold text-sm shadow-md shadow-blue-500/20"
          >
            <Search size={16} />
            <span>Search</span>
          </Button>
        </form>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-white/[0.06] items-center">
          <div className="sm:col-span-5 w-full">
            <Select value={location} onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="w-full h-11 rounded-xl">
                <div className="flex items-center gap-2 truncate">
                  <MapPin size={15} className="text-indigo-400 shrink-0" />
                  <SelectValue placeholder="All Locations" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {State.getStatesOfCountry("IN").map(({ name }) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-5 w-full">
            <Select
              value={company_id}
              onValueChange={(value) => setCompany_id(value)}
            >
              <SelectTrigger className="w-full h-11 rounded-xl">
                <div className="flex items-center gap-2 truncate">
                  <Building2 size={15} className="text-purple-400 shrink-0" />
                  <SelectValue placeholder="All Companies" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies?.map(({ name, id }) => (
                    <SelectItem key={id} value={String(id)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 w-full">
            <Button
              type="button"
              variant="outline"
              className={`w-full h-11 rounded-xl gap-2 text-xs sm:text-sm font-medium transition-all ${
                hasActiveFilters
                  ? "border-rose-500/30 text-rose-400 hover:bg-rose-500/15"
                  : "opacity-60"
              }`}
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </Button>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-300">
              <Filter size={12} /> Active Filters:
            </span>
            {searchQuery && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300">
                Title: &quot;{searchQuery}&quot;
              </span>
            )}
            {location && (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                Location: {location}
              </span>
            )}
            {company_id && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                Company: {companies?.find((c) => String(c.id) === company_id)?.name || "Selected"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Briefcase size={16} className="text-indigo-400" />
            <span>
              {loadingJobs ? (
                "Scanning job openings..."
              ) : (
                <>
                  Showing <strong className="text-white">{jobs?.length || 0}</strong> available opportunities
                </>
              )}
            </span>
          </div>
        </div>

        {loadingJobs && (
          <div className="py-12 flex flex-col items-center justify-center">
            <BarLoader width="100%" color="#6366f1" />
          </div>
        )}

        {!loadingJobs && (
          <>
            {jobs?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] text-center max-w-md mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Matching Jobs Found</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  We couldn&apos;t find any open positions matching your search criteria. Try modifying your keywords or resetting filters.
                </p>
                {hasActiveFilters && (
                  <Button variant="secondary" onClick={clearFilters} className="gap-2 rounded-xl">
                    <RotateCcw size={15} />
                    <span>Clear All Filters</span>
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobListing;
