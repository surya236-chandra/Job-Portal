/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import {
  Send,
  Upload,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  AlertCircle,
  FileCheck,
} from "lucide-react";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int({ message: "Experience must be a whole number" }),

  skills: z.string().min(1, {
    message: "Skills are required",
  }),

  education: z.enum(
    ["Intermediate", "Graduate", "Post Graduate"],
    {
      message: "Education is required",
    }
  ),

  resume: z
    .any()
    .refine(
      (file) =>
        file &&
        file[0] &&
        (
          file[0].type === "application/pdf" ||
          file[0].type === "application/msword" ||
          file[0].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ),
      {
        message: "Only PDF or Word documents are allowed (.pdf, .doc, .docx)",
      }
    ),
});

export function ApplyJobDrawer({
  user,
  job,
  fetchJob,
  applied = false,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="xl"
          variant={
            job?.isOpen && !applied
              ? "blue"
              : "secondary"
          }
          disabled={!job?.isOpen || applied}
          className={`gap-2 min-w-48 shadow-xl ${
            applied
              ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
              : ""
          }`}
        >
          {applied ? (
            <>
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Application Submitted</span>
            </>
          ) : job?.isOpen ? (
            <>
              <Send size={18} />
              <span>Apply for this Role</span>
            </>
          ) : (
            <span>Hiring Closed</span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-[#12121a]/95 border-t border-white/15 backdrop-blur-2xl max-w-2xl mx-auto rounded-t-3xl">
        <DrawerHeader className="text-center pt-6">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
            <Sparkles size={22} />
          </div>
          <DrawerTitle className="text-2xl font-bold text-white">
            Apply for {job?.title}
          </DrawerTitle>
          <DrawerDescription className="text-slate-400 text-sm">
            at {job?.company?.name || "Company"} • Provide your experience & credentials
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-6 max-h-[70vh] overflow-y-auto"
        >
          {/* Experience */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-300">
              Years of Experience
            </Label>
            <Input
              type="number"
              placeholder="e.g. 3"
              className="h-11 rounded-xl"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />
            {errors.experience && (
              <p className="text-rose-400 text-xs flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} />
                <span>{errors.experience.message}</span>
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-300">
              Core Skills & Technologies
            </Label>
            <Input
              type="text"
              placeholder="React, TypeScript, Node.js, Tailwind CSS..."
              className="h-11 rounded-xl"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-rose-400 text-xs flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} />
                <span>{errors.skills.message}</span>
              </p>
            )}
          </div>

          {/* Education Selection */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <GraduationCap size={14} className="text-purple-400" />
              <span>Highest Level of Education</span>
            </Label>

            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                >
                  {["Intermediate", "Graduate", "Post Graduate"].map((edu) => {
                    const isSelected = field.value === edu;
                    return (
                      <label
                        key={edu}
                        htmlFor={edu.toLowerCase().replace(" ", "-")}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                          isSelected
                            ? "bg-indigo-500/15 border-indigo-500/50 text-white shadow-sm"
                            : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]"
                        }`}
                      >
                        <RadioGroupItem
                          value={edu}
                          id={edu.toLowerCase().replace(" ", "-")}
                        />
                        <span>{edu}</span>
                      </label>
                    );
                  })}
                </RadioGroup>
              )}
            />

            {errors.education && (
              <p className="text-rose-400 text-xs flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} />
                <span>{errors.education.message}</span>
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Upload size={14} className="text-blue-400" />
              <span>Upload Resume (PDF, DOCX)</span>
            </Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="h-12 rounded-xl py-2 cursor-pointer bg-white/[0.03]"
              {...register("resume")}
            />
            {errors.resume && (
              <p className="text-rose-400 text-xs flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} />
                <span>{errors.resume.message}</span>
              </p>
            )}
          </div>

          {/* API Error */}
          {errorApply?.message && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorApply.message}</span>
            </div>
          )}

          {/* Loading bar */}
          {loadingApply && (
            <BarLoader width="100%" color="#6366f1" />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="blue"
            size="lg"
            className="w-full mt-2 rounded-xl py-6 gap-2 text-base font-semibold shadow-xl shadow-blue-500/20"
            disabled={loadingApply}
          >
            <FileCheck size={18} />
            <span>{loadingApply ? "Submitting Application..." : "Submit Application"}</span>
          </Button>
        </form>

        <DrawerFooter className="pt-0 pb-6 px-6">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full rounded-xl">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
