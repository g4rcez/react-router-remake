import { Config } from "./create-router";
import { Strings, Merge, RouterUtils } from "./types";

const regex = /(<\w+:(\w+)>)/gm;

const captureGroupMap: Record<string, string> = {
  string: "[^/:]",
  number: "[0-9]"
};

export const parseGroupMap: Record<string, (a: string) => any> = {
  string: (str: string) => `${str}`,
  default: (str: string) => `${str}`,
  number: (str: string) => Number(str)
};

export const createUrlPatternMatch = <U extends string>(url: U, config?: Config): RegExp => {
  const captureGroup = { ...captureGroupMap, ...config?.pathsParser?.match };
  const stringRegExp = url.replace(regex, (capture) => {
    const sanitized = capture.replace("<", "").replace(">", "").replace(":", "___");
    const captured = sanitized.split("___")[1]!;
    const parser = captureGroup[captured] || captureGroupMap.string;
    return `(?<${sanitized.replace(/^:/g, "")}>${parser}+)`;
  });
  return new RegExp(`^(${stringRegExp})$`, "gm");
};

type ParseParams<T extends string[]> = T extends [infer F, ...infer Rest]
  ? F extends string
    ? Strings.Contains<F, ":"> extends true
      ? {
          [K in Strings.Replace<Strings.Split<F, ":">[0], "<", "">]: Strings.Replace<
            NonNullable<Strings.Split<F, ":">[1]>,
            ">",
            ""
          > extends `${infer R}`
            ? R extends keyof RouterUtils.ParseValue
              ? RouterUtils.ParseValue[R]
              : never
            : never;
        } & (Rest extends string[] ? ParseParams<Rest> : {})
      : Rest extends string[]
        ? ParseParams<Rest>
        : {}
    : {}
  : {};

export type ParseUrlPaths<T extends string> =
  Strings.Contains<T, "<"> extends true
    ? Strings.Contains<T, ">"> extends true
      ? Merge<ParseParams<Strings.Split<T, "/">>>
      : {}
    : {};

