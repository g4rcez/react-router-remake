import { AnchorHTMLAttributes, MouseEvent } from "react";
import { useHistory, useLocation } from "./hook.ts";
import { ParseUrlPaths } from "./utils.ts";
import { Strings, QueryString } from "./types.ts";

type CreatePath<Path extends string> = Path extends `${string}/<${string}:${string}>`
  ? {
      params: ParseUrlPaths<Path>;
    }
  : {
      params?: undefined;
    };

export type LinkProps<Path extends string> = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Path;
  query?: QueryString.Parse<Path>;
} & CreatePath<Strings.Split<Path, "?">[0]>;

const isExternalLink = (href: string) => /https?:\/\//.test(href);

const regex = /(<(\w+):\w+>)/gm;
const transformUrl = <Path extends string>(
  href: string,
  params: ParseUrlPaths<Path> | undefined,
  query: QueryString.Parse<Path> | undefined
) => {
  if (!params) return href;
  const pathname = href.replace(regex, (_, __, param) => {
    if (params) return (params as any)[param];
    return "";
  });
  const url = new URL(pathname, "http://localhost");
  if (!!query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, `${value}`);
    });
  }
  return `${url.pathname}${url.search}`;
};

export const Link = <Path extends string>(props: LinkProps<Path>) => {
  const history = useHistory();
  const location = useLocation();

  const isExternal = isExternalLink(props.href);

  const _href = isExternal ? props.href : transformUrl(props.href, props.params as never, props.query);

  const onClick = (e: MouseEvent<HTMLAnchorElement> | undefined) => {
    if (!_href) return;
    if (isExternalLink(_href)) return;
    e?.preventDefault();
    if (location.pathname === _href) return;
    history.push(_href);
  };

  return <a {...props} href={_href} onClick={onClick} />;
};
