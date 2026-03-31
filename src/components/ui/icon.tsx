import ExpoIcon from "@/public/icons/expo.svg";
import GithubIcon from "@/public/icons/github.svg";
import JavascriptIcon from "@/public/icons/javascript.svg";
import LinkedinIcon from "@/public/icons/linkedin.svg";
import ReactIcon from "@/public/icons/react.svg";
import ReactNativeIcon from "@/public/icons/reactnative.svg";
import {
  ClipboardCheck,
  Clock,
  Code,
  Database,
  FunctionSquare,
  Hammer,
  Network,
  Sparkles,
  Store,
  Upload,
  Waves,
  Wind,
} from "lucide-react";

import { cn } from "@/lib/utils";

const sources = {
  react: ReactIcon,
  "react-native": ReactNativeIcon,
  "react-query": Database,
  expo: ExpoIcon,
  javascript: JavascriptIcon,
  "react-hook-form": ClipboardCheck,
  tailwind: Wind,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  motion: Sparkles,
  reanimated: Waves,
  axios: Network,
  "eas-build": Hammer,
  "eas-updates": Upload,
  stores: Store,
  es6: Code,
  async: Clock,
  functional: FunctionSquare,
};

type Props = {
  icon: keyof typeof sources;
  className?: string;
} & Partial<SVGElement>;

export type IconsNames = keyof typeof sources;

export default function Icon({ icon, className }: Props) {
  const Comp = sources[icon];
  return <Comp focusable={false} className={cn("w-6 h-6", className)} />;
}
