/* eslint-disable react/prop-types */

import {
  Boxes,
  BriefcaseBusiness,
  Download,
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  UserCheck,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "hired":
      return {
        bg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        icon: <CheckCircle2 size={13} />,
      };
    case "interviewing":
      return {
        bg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        icon: <Clock size={13} />,
      };
    case "rejected":
      return {
        bg: "bg-rose-500/15 text-rose-400 border-rose-500/30",
        icon: <XCircle size={13} />,
      };
    default:
      return {
        bg: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        icon: <UserCheck size={13} />,
      };
  }
};

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateApplicationStatus, {
    job_id: application.job_id,
  });

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  const statusConfig = getStatusBadge(application?.status);

  return (
    <Card className="hover:border-white/20 transition-all duration-200">
      {loadingHiringStatus && (
        <BarLoader width={"100%"} color="#6366f1" />
      )}

      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-white">
              {isCandidate
                ? application?.job?.title
                : application?.name}
            </span>
            {isCandidate && application?.job?.company?.name && (
              <span className="text-xs text-indigo-400 flex items-center gap-1 font-medium">
                <Building2 size={13} />
                {application.job.company.name}
              </span>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="rounded-xl gap-2 hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all"
            title="Download Attached Resume"
          >
            <Download size={15} />
            <span className="text-xs hidden sm:inline">Resume</span>
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pb-3">
        {/* Candidate Detail Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
            <BriefcaseBusiness size={15} className="text-indigo-400 shrink-0" />
            <span className="truncate">
              <strong>{application?.experience}</strong> yrs experience
            </span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
            <GraduationCap size={15} className="text-purple-400 shrink-0" />
            <span className="truncate">{application?.education}</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
            <Boxes size={15} className="text-emerald-400 shrink-0" />
            <span className="truncate" title={application?.skills}>
              {application?.skills}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-slate-500" />
          <span>Applied on {new Date(application?.created_at).toLocaleDateString()}</span>
        </div>

        {isCandidate ? (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize border ${statusConfig.bg}`}
          >
            {statusConfig.icon}
            <span>Status: {application.status}</span>
          </span>
        ) : (
          <div className="w-full sm:w-48">
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application.status}
            >
              <SelectTrigger className="w-full h-9 rounded-xl text-xs">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="applied">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <UserCheck size={13} /> Applied
                  </span>
                </SelectItem>
                <SelectItem value="interviewing">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Clock size={13} /> Interviewing
                  </span>
                </SelectItem>
                <SelectItem value="hired">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 size={13} /> Hired
                  </span>
                </SelectItem>
                <SelectItem value="rejected">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <XCircle size={13} /> Rejected
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;