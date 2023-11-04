"use client";
import AnimatedImage from "@/components/custom/AnimatedImage";
import AnimatedLetters from "@/components/custom/AnimatedLetters";
import AnimatedExperienceBar from "@/components/experience/AnimatedExperienceBar";
import { urlFor } from "@/lib/sanity/client";
import { ExperienceType } from "@/types/types";
import Image from "next/image";
type ExperienceCardType = {
  experienceData: ExperienceType;
};

const ExperienceCard = ({ experienceData }: ExperienceCardType) => {
  const {
    position,
    subtitle,
    startDate,
    endDate,
    companyLogo,
    featuredImage,
    skills,
  } = experienceData;

  return (
    <div className="relative z-10 grid h-fit max-h-[80vh] min-w-[330px] max-w-[min(90vw,600px)] flex-1 grid-cols-5 grid-rows-[auto_auto_1fr] pb-1 lg:max-w-3xl lg:overflow-y-auto 2xl:max-w-4xl">
      {/* Start & End Date (r1, c1) */}
      <div className="col-start-1 row-start-1 flex h-fit w-fit justify-end gap-2 justify-self-end overflow-x-visible pb-3 pr-2 pt-10">
        <AnimatedExperienceBar startDate={startDate} endDate={endDate} />
      </div>
      {/* Content Card (r1, c2) */}
      <div className="relative col-start-2 col-end-6 row-start-1 row-end-3 flex flex-col gap-3 p-5 lg:gap-4 lg:px-10 lg:py-6 2xl:py-12">
        {/* Logo */}
        <div className="block lg:hidden">
          <Image
            src={urlFor(companyLogo)?.url() ?? "/images/bg-waves.webp"}
            alt=""
            width={64}
            height={64}
            className="rounded-md"
          />
        </div>
        <div className="hidden lg:block">
          <Image
            src={urlFor(companyLogo)?.url() ?? "/images/bg-waves.webp"}
            alt=""
            width={72}
            height={72}
            className="rounded-md"
          />
        </div>
        {/* Background */}
        <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden rounded-lg rounded-br-sm">
          <AnimatedImage
            src={urlFor(featuredImage)?.url() ?? "/images/bg-waves.webp"}
            alt=""
            fill
            sizes="100vw"
            className="-z-20 rounded-br-none object-cover"
          />
          <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg rounded-br-none bg-gradient-to-r from-[rgba(41,41,41,0.9)] to-[rgba(91,84,84,0.4)]" />
        </div>
        <AnimatedLetters
          tag="h4"
          pb={4}
          className="text-3xl font-light leading-8 tracking-wide sm:text-4xl lg:text-5xl 2xl:text-6xl"
        >
          {position}
        </AnimatedLetters>
        <AnimatedLetters
          tag="p"
          stagger={0.02}
          className="text-sm font-light tracking-wide sm:text-base lg:text-2xl"
        >
          {subtitle}
        </AnimatedLetters>
      </div>
      {/* White panel (r2, c1) */}
      <div className="row-span-2 row-start-2 w-5 justify-self-end rounded-l-lg border-2 border-r-0 border-neutral-500 border-opacity-10 bg-panel-light shadow-panel lg:w-10" />
      {/* Bullets & Skills (r3, c2) */}
      <div className="col-start-2 col-end-6 row-start-3 rounded-br-lg border-b-2 border-neutral-500 border-opacity-10 bg-panel-darkest p-5 pt-3 shadow-panel">
        <ul className="flex flex-wrap gap-x-3 gap-y-2 text-xs font-light uppercase tracking-widest text-dim sm:text-sm lg:text-base 2xl:text-lg">
          {skills?.map((skill, i) => {
            const { _id, name } = skill;
            return (
              <li key={_id}>
                <span>{name}</span>
                <span aria-hidden={true} className="pl-3">
                  {i !== skills.length - 1 && <span>&#8226;</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
