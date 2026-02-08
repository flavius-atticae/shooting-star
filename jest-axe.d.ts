declare module "jest-axe" {
  import type { RunOptions, AxeResults } from "axe-core";

  type JestAxeConfigureOptions = {
    globalOptions?: Parameters<typeof import("axe-core").configure>[0];
  } & RunOptions;

  function axe(
    html: Element | string,
    options?: RunOptions
  ): Promise<AxeResults>;

  function configureAxe(
    options?: JestAxeConfigureOptions
  ): typeof axe;
}
