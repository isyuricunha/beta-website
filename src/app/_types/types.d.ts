import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// ===========================================
// SANITY DATA FETCHING
// ===========================================

export interface sanityResponseType {
  heroLinks: Array<HeroSectionLink>;
  experiences: Array<ExperienceType>;
  projects: Array<ProjectType>;
}

// ===========================================
// SANITY REACT ICON
// ===========================================
export interface SanityReactIcon {
  library: string;
  name: string;
}

// ===========================================
// SKILLS
// ===========================================
export type SkillType = {
  name: string;
  reactIcon: SanityReactIcon;
  _id: string;
};

// ===========================================
// HERO SECTION
// ===========================================
export interface HeroSectionLink {
  name: string;
  linkURL: string;
  key: string;
  reactIcon: SanityReactIcon;
}

// ===========================================
// EXPERIENCE SECTION
// ===========================================
interface ExperienceBullet {
  content: string;
  _key: string;
}

export interface ExperienceType {
  _id: string;
  position: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  featuredImage: SanitySourceImage;
  companyLogo: SanityImageSource;
  bullets?: Array<ExperienceBullet>;
  skills: Array<SkillType>;
}

// ===========================================
// PROJECT SECTION
// ===========================================
export interface ProjectType {
  _id: string;
  title: string;
  subtitle: string;
  featuredImage: SanitySourceImage;
  techStack: Array<SkillType>;
  description: any;
  links: Array<ProjectLink>;
  date: string;
  award?: Array<ProjectAward>;
}

export type ProjectLink = {
  linkURL: string;
  reactIcon: SanityReactIcon;
  linkTooltip: string;
};

type ProjectAward = {
  awardDescription: string;
  organization: string;
};
