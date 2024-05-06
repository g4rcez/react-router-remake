import { AnchorHTMLAttributes, MouseEvent } from "react";
import { useHistory, useLocation } from "./hook.ts";
import { ParseUrlPaths } from "./utils.ts";

type CreatePath<Path extends string> = Path extends `${string}/<${string}:${string}>`
  ? {
      params: ParseUrlPaths<Path>;
    }
  : {
      params?: undefined;
    };

export type LinkProps<Path extends string> = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Path;
} & CreatePath<Path>;

const isExternalLink = (href: string) => /https?:\/\//.test(href);

const transformUrl = <Path extends string>(href: string, params?: ParseUrlPaths<Path>) => {
  if (!params) return href;

  return Object.entries(params).reduce((acc, [key, value]) => {
    const paramsRegex = new RegExp(`<${key}:\\w+>`, "g");
    return acc.replace(paramsRegex, value as string);
  }, href);
};

export const Link = <Path extends string>(props: LinkProps<Path>) => {
  const history = useHistory();
  const location = useLocation();

  const isExternal = isExternalLink(props.href);

  const _href = isExternal ? props.href : transformUrl(props.href, props.params);

  const onClick = (e: MouseEvent<HTMLAnchorElement> | undefined) => {
    if (!_href) return;
    if (isExternalLink(_href)) return;
    e?.preventDefault();
    if (location.pathname === _href) return;
    history.push(_href);
  };

  return <a {...props} href={_href} onClick={onClick} />;
};
