declare module "jest-axe" {
  import type { RunOptions, AxeResults } from "axe-core";

  type JestAxeConfigureOptions = {
    globalOptions?: Parameters<typeof import("axe-core").configure>[0];
  } & RunOptions;

  export function axe(
    html: Element | string,
    options?: RunOptions
  ): Promise<AxeResults>;

  export function configureAxe(
    options?: JestAxeConfigureOptions
  ): typeof axe;
}
