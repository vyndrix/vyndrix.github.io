"use client";

import { useURI } from "@/hooks/use-uri";
import { Mail } from "lucide-react";
import { LocaleSwitch } from "./locale-switch";
import ThemeSwitch from "./theme-switch";
import { Button, Icon } from "./ui";

const LINKEDIN_URI = "https://www.linkedin.com/in/ramonfersouza/";
const GITHUB_URI = "https://github.com/vyndrix";
const EMAIL_URI = "mailto:ramonfersouza@gmail.com";

export function Header() {
  const openLinkedin = useURI(LINKEDIN_URI);
  const openGitHub = useURI(GITHUB_URI);
  const openEmail = useURI(EMAIL_URI, "_self");

  return (
    <header className="flex justify-between sm:justify-end top-0 p-4 gap-2">
      <div className="flex gap-2">
        <Button
          data-umami-event="social-media-click"
          data-umami-event-social="github"
          onClick={openGitHub}
        >
          <Icon icon="github" className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          data-umami-event="social-media-click"
          data-umami-event-social="linkedin"
          onClick={openLinkedin}
        >
          <Icon icon="linkedin" className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          data-umami-event="social-media-click"
          data-umami-event-social="email"
          onClick={openEmail}
        >
          <Mail className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div className="flex gap-2">
        <LocaleSwitch />
        <ThemeSwitch />
      </div>
    </header>
  );
}
