import {
  BsGithub,
  BsLinkedin,
  BsNewspaper,
  BsUniversalAccessCircle,
  BsGlobe,
  BsCodeSlash,
  BsFillChatLeftTextFill,
} from "react-icons/bs";
import {
  SiContentful,
  SiFlask,
  SiFramer,
  SiGooglecloud,
  SiMongodb,
  SiNextdotjs,
  SiPlotly,
  SiThreedotjs,
  SiTypescript,
  SiCplusplus,
  SiSupabase,
} from "react-icons/si";

type IconProps = {
  icon: string;
  library: "Bs" | "Si" | string;
  color?: string;
  size?: string;
  className?: string;
  fallback?: JSX.Element | null;
};

const DynamicIcon = ({
  icon,
  library,
  className,
  fallback,
}: IconProps): JSX.Element => {
  switch (library) {
    case "Bs": {
      switch (icon) {
        case "BsGithub":
          return <BsGithub className={className} />;
        case "BsNewspaper":
          return <BsNewspaper className={className} />;
        case "BsLinkedin":
          return <BsLinkedin className={className} />;
        case "BsUniversalAccessCircle":
          return <BsUniversalAccessCircle className={className} />;
        case "BsGlobe":
          return <BsGlobe className={className} />;
        case "BsCodeSlash":
          return <BsCodeSlash className={className} />;
        case "BsFillChatLeftTextFill":
          return <BsFillChatLeftTextFill className={className} />;
      }
    }
    case "Si": {
      switch (icon) {
        case "SiFlask":
          return <SiFlask className={className} />;
        case "SiGooglecloud":
          return <SiGooglecloud className={className} />;
        case "SiTypescript":
          return <SiTypescript className={className} />;
        case "SiContentful":
          return <SiContentful className={className} />;
        case "SiNextdotjs":
          return <SiNextdotjs className={className} />;
        case "SiPlotly":
          return <SiPlotly className={className} />;
        case "SiFramer":
          return <SiFramer className={className} />;
        case "SiMongodb":
          return <SiMongodb className={className} />;
        case "SiThreedotjs":
          return <SiThreedotjs className={className} />;
        case "SiCplusplus":
          return <SiCplusplus className={className} />;
        case "SiSupabase":
          return <SiSupabase className={className} />;
      }
    }
  }
  return fallback ?? <></>;
};

export default DynamicIcon;
