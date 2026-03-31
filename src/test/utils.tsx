import { messages } from "@/i18n/locales";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import {
  RenderHookResult,
  RenderOptions,
  render as RTLRender,
  renderHook as RTLRenderHook,
} from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import React, { ReactElement } from "react";

i18n.load(messages);
i18n.activate("en-US");

const Wrapper = ({ children }: { children: React.ReactNode }) => {
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

const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  RTLRender(ui, { wrapper: Wrapper, ...options });

const renderHook = <Result, Props>(
  hook: (props: Props) => Result,
  options?: Omit<RenderOptions, "wrapper">,
): RenderHookResult<Result, Props> =>
  RTLRenderHook(hook, { wrapper: Wrapper, ...options });

export { i18n, render, renderHook };
