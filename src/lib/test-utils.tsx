import { messages } from "@/i18n/locales";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render as testingRender } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import React from "react";

i18n.load(messages);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      storageKey="theme"
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </ThemeProvider>
  );
};

const render: (
  ...params: Parameters<typeof testingRender>
) => ReturnType<typeof testingRender> = (ui, options) =>
  testingRender(ui, { wrapper: Providers, ...options });

export { i18n, render };
