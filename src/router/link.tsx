import { AnchorHTMLAttributes, MouseEvent } from "react";
import { useHistory, useLocation } from "./hook.ts";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (href: string) => /https?:\/\//.test(href);

export const Link = (props: LinkProps) => {
  const history = useHistory();
  const location = useLocation();

  const onClick = (e: MouseEvent<HTMLAnchorElement> | undefined) => {
    if (!props.href) return;
    if (isExternalLink(props.href)) return;
    e?.preventDefault();
    if (location.pathname === props.href) return;
    history.push(props.href);
  };

  return <a {...props} href={props.href} onClick={onClick} />;
};
