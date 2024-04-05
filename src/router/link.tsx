import { AnchorHTMLAttributes, MouseEvent } from "react";
import { useHistory } from "./hook.ts";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * [ x ] adicionar comportamento de SPA;
 * [  ] verificar se o link aponta para o pathname atual;
 * [ x ] add case -> link externo;
 * */

const isExternalLink = (href: string) => /https?:\/\//.test(href);

export const Link = (props: LinkProps) => {
  const history = useHistory();

  const onClick = (e: MouseEvent<HTMLAnchorElement> | undefined) => {
    if (!props.href) return;
    if (isExternalLink(props.href)) return;
    e?.preventDefault();
    history.push(props.href);
  };

  return <a {...props} href={props.href} onClick={onClick} />;
};
