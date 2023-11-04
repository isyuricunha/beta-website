import AnimatedContent from "@/components/custom/AnimatedContent";
import Image from "next/image";
import React from "react";

type AwardProps = {
  description: string;
  organization: string;
};

const ProjectAward = ({ description, organization }: AwardProps) => {
  return (
    <AnimatedContent className="relative grid max-w-xs grid-cols-[auto_1fr] justify-start px-2 sm:w-fit sm:min-w-[350px] sm:max-w-none sm:px-5 lg:px-10">
      {/* Content */}
      <div className="relative col-start-1 row-span-3 row-start-1 ml-2 mr-2 self-center sm:ml-6 sm:mr-4">
        <Image
          src="icons/project/trophy.svg"
          alt=""
          height={64}
          width={64}
          className="block lg:hidden"
        />
        <Image
          src="icons/project/trophy.svg"
          alt=""
          height={72}
          width={72}
          className="hidden lg:block"
        />
      </div>
      <div className="col-span-2 col-start-1 row-start-2 h-full rounded-md bg-gradient-to-r from-[rgba(193,147,197,0.25)] to-[rgba(123,198,204,0.25)]" />
      <div className="relative col-start-2 row-start-2 flex flex-col justify-center sm:pr-10 lg:pb-1 lg:pt-2">
        <p className="text-sm font-normal uppercase tracking-wider sm:text-base lg:text-lg lg:font-light lg:leading-4">
          {organization}
        </p>
        <p className="text-xs font-extralight tracking-wide lg:text-sm lg:font-thin">
          {description}
        </p>
      </div>
      {/* Gutters */}
      <div className="col-span-2 row-start-1 h-2" />
      <div className="col-span-2 row-start-3 h-2" />
    </AnimatedContent>
  );
};

export default ProjectAward;
