import React, { Fragment, useLayoutEffect, useState } from "react";
import { CreateRouter, RoutesReadonly } from "./create-router";
import { context, RouterContext, useRouter } from "./hook.ts";

type Props = React.PropsWithChildren<{ config: CreateRouter<RoutesReadonly> }>;

type OutletProps = {
  notFound?: React.ReactElement;
}

export const Outlet = (props: OutletProps) => {
  const router = useRouter();
  if (router.outlet) return <Fragment>{router.outlet}</Fragment>;
  if (props.notFound) return props.notFound;
  return null;
};

export const useHistory = () => useRouter().history;

export const Router = (props: Props) => {
  const config = props.config;
  const [state, setState] = useState(window.location.href);

  // useLayoutEffect para rodar antes da renderização dos elementos
  useLayoutEffect(() => {
    config.history.addEventListener(setState);
    return () => config.history.removeEventListener(setState);
  }, [config]);

  const url = new URL(state, "http://localhost");

  const value: RouterContext = {
    history: config.history,
    href: config.href,
    pathname: config.pathname,
    // aqui vai precisar aplicar a lógica para pegar paths dinâmicos de acordo
    // com a regex fornecida na string. Escolher o padrão /users/<id:string> ou /users/:id
    // <id:string> -> ajuda na tipagem e trás mais explicito a intenção de uso
    // /:id -> tudo é string
    outlet: config.routes.find((route) => {
      route.path === url.pathname
    })?.element,
    links: config.links
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};
