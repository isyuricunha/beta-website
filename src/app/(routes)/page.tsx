import { client } from "@/lib/sanity/client";
import { sanityResponseType } from "@/types/types";
import Image from "next/image";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projectlist/Projects";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Suspense } from "react";

async function fetchCMSData() {
  const postQuery = `*[_type == "showcase"]{
    heroLinks[] {
      ...,
      reactIcon->{name, library},
    },
    experiences[]-> {
      ...,
      skills[]-> {
        ...,
        reactIcon->{name, library},
      }
    },
    projects[]-> {
      ...,
      links[] {
        ...,
        reactIcon->{name, library},
      },
      techStack[]-> {
        ...,
        reactIcon->{name, library}
      }
    }
  }[0]
  
  
  `;
  const data = await client.fetch(postQuery);

  return data;
}

export default async function Home() {
  const sanityData: sanityResponseType = await fetchCMSData();

  // console.log(sanityData);
  const { heroLinks, experiences, projects } = sanityData;

  return (
    <main className="items-center font-outfit">
      {/* Background Image */}
      <div className="gradient-home fixed left-0 top-0 z-0 h-full w-full">
        <Image
          src="/images/bg-waves.webp"
          alt=""
          fill
          className="object-cover opacity-[15%]"
        />
      </div>

      {/* Content Wrapper*/}
      <div className="relative z-10 w-full">
        {/* About */}
        <About links={heroLinks} />

        {/* Experience */}
        <Experience experiences={experiences} />

        {/* Projects */}
        <Projects projects={projects} />

        {/* Navbar */}
        <Navbar />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
