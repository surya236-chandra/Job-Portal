import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faqs.json";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Search,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  HelpCircle,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="text-center relative flex flex-col items-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight py-2 leading-tight">
          <span>Find Your Dream Career</span>
          <span className="flex items-center justify-center gap-3 sm:gap-5 mt-2 flex-wrap">
            <span>and get</span>
            <span className="relative inline-block px-3 py-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl">
              <img
                src="/logo.png"
                alt="Hirrd Logo"
                className="h-12 sm:h-20 lg:h-24 w-auto object-contain inline-block"
              />
            </span>
          </span>
        </h1>

        <p className="text-slate-400 sm:mt-6 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Discover thousands of verified job opportunities at top tech companies, or recruit premier candidate talent with effortless application workflows.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 sm:mt-10 w-full max-w-md">
          <Link to="/job" className="w-full sm:w-auto">
            <Button
              variant="blue"
              size="xl"
              className="w-full sm:w-auto gap-2.5 font-bold"
            >
              <Search size={20} />
              <span>Explore Jobs</span>
              <ArrowRight size={18} />
            </Button>
          </Link>

          <Link to="/post-job" className="w-full sm:w-auto">
            <Button
              variant="destructive"
              size="xl"
              className="w-full sm:w-auto gap-2.5 font-bold"
            >
              <Briefcase size={20} />
              <span>Post a Job</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Companies Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 flex items-center justify-center">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Featured Banner Showcase */}
      <section className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
        <img
          src="/banner.jpeg"
          alt="Hirrd Platform Banner"
          className="w-full max-h-[460px] object-cover"
        />
      </section>

      {/* Value Proposition Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For Job Seekers */}
        <Card className="bg-[#121217] border border-zinc-800 hover:border-zinc-700 shadow-lg transition-colors">
          <CardHeader>
            <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 mb-2">
              <Users size={22} />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">For Job Seekers</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 text-zinc-300 text-sm sm:text-base">
            <p className="text-zinc-400">
              Search and apply for jobs, track live application progress, and bookmark target companies.
            </p>
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-blue-500 shrink-0" />
                <span>Search by role, state, and verified enterprise companies</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-blue-500 shrink-0" />
                <span>Save favorites and track live submission statuses</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-blue-500 shrink-0" />
                <span>One-click resume dispatch directly to hiring leads</span>
              </li>
            </ul>
            <div className="pt-3">
              <Link to="/job">
                <Button variant="outline" className="w-full sm:w-auto gap-2 border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                  <span>Browse Open Roles</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* For Employers */}
        <Card className="bg-[#121217] border border-zinc-800 hover:border-zinc-700 shadow-lg transition-colors">
          <CardHeader>
            <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 mb-2">
              <Building2 size={22} />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">For Employers</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 text-zinc-300 text-sm sm:text-base">
            <p className="text-zinc-400">
              Post jobs, review applicant submissions, and manage hiring decisions in real-time.
            </p>
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-red-500 shrink-0" />
                <span>Post rich markdown job descriptions & skill requirements</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-red-500 shrink-0" />
                <span>Review candidate resumes, experience, and education</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-red-500 shrink-0" />
                <span>Toggle hiring pipeline status between Applied, Interviewing, and Hired</span>
              </li>
            </ul>
            <div className="pt-3">
              <Link to="/post-job">
                <Button variant="outline" className="w-full sm:w-auto gap-2 border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                  <span>Start Hiring Now</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col items-center gap-8 pt-6">
        <div className="text-center max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Clear answers about using Hirrd to power your career or recruitment workflow.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto flex flex-col gap-3"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md px-5 py-1 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <AccordionTrigger className="text-base sm:text-lg font-medium text-white hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-slate-300 leading-relaxed text-sm sm:text-base pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default LandingPage;