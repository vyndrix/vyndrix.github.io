"use client";

import { useURI } from "@/hooks/use-uri";
import { Mail } from "lucide-react";
import { Switch } from "../switch";
import { Button, Icon } from "../ui";

const LINKEDIN_URI = "https://www.linkedin.com/in/ramonfersouza/";
const GITHUB_URI = "https://github.com/vyndrix";
const EMAIL_URI = "mailto:ramonfersouza@gmail.com";

export function Header() {
  const openLinkedin = useURI(LINKEDIN_URI);
  const openGitHub = useURI(GITHUB_URI);
  const openEmail = useURI(EMAIL_URI, "_self");

  return (
    <header
      role="header"
      className="flex justify-between sm:justify-end top-0 p-4 gap-2"
    >
      <div role="group" aria-label="social-links-group" className="flex gap-2">
        <Button
          aria-label="Github Profile"
          data-umami-event="social-media-click"
          data-umami-event-social="github"
          onClick={openGitHub}
        >
          <Icon
            icon="github"
            aria-hidden={true}
            className="h-[1.2rem] w-[1.2rem]"
          />
        </Button>
        <Button
          aria-label="Linkedin Profile"
          data-umami-event="social-media-click"
          data-umami-event-social="linkedin"
          onClick={openLinkedin}
        >
          <Icon
            icon="linkedin"
            aria-hidden={true}
            className="h-[1.2rem] w-[1.2rem]"
          />
        </Button>
        <Button
          aria-label="Email Me"
          data-umami-event="social-media-click"
          data-umami-event-social="email"
          onClick={openEmail}
        >
          <Mail aria-hidden={true} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div role="group" aria-label="preferences-group" className="flex gap-2">
        <Switch.Locale />
        <Switch.Theme />
      </div>
    </header>
  );
}
