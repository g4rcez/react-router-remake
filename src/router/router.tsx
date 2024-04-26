import React, { Fragment, useLayoutEffect, useMemo, useState } from "react";
import { Config, CreateRouter, Route, RoutesReadonly } from "./create-router";
import { context, RouterContext, useRouter } from "./hook.ts";
import { createUrlPatternMatch, parseGroupMap, ParseUrlPaths } from "./utils.ts";

type Props = React.PropsWithChildren<{ config: CreateRouter<RoutesReadonly, Config> }>;

type OutletProps = {
  notFound?: React.ReactElement;
};

export const Outlet = (props: OutletProps) => {
  const router = useRouter();
  if (router.outlet) return <Fragment>{router.outlet}</Fragment>;
  if (props.notFound) return props.notFound;
  return null;
};

export const useHistory = () => useRouter().history;

const parsePaths = (route: Route, pathname: string, config?: Config) => {
  const r = createUrlPatternMatch(route.path, config).exec(pathname);
  if (!r) return {};
  const group = { ...parseGroupMap, ...config?.pathsParser?.map };
  return Object.entries(r.groups || {}).reduce((acc, [key, value]) => {
    const [name, type] = key.split("___");
    const fn = group[type] || parseGroupMap.default;
    const val = fn(value);
    return { ...acc, [name]: val };
  }, {});
};

export const usePaths = <T extends string>(_?: T): ParseUrlPaths<T> => {
  const router = useRouter();
  const outlet = router.page;
  const config = router.config;
  return useMemo(
    () => (outlet ? parsePaths(outlet, router.pathname, config) : {}),
    [outlet, router.pathname, config]
  ) as ParseUrlPaths<T>;
};

export const Router = (props: Props) => {
  const config = props.config;
  const userConfig = props.config.config;
  const [state, setState] = useState(window.location.href);

  // useLayoutEffect para rodar antes da renderização dos elementos
  useLayoutEffect(() => {
    config.history.addEventListener(setState);
    return () => config.history.removeEventListener(setState);
  }, [config]);

  const url = new URL(state, "http://localhost");

  const outlet = config.routes.find((route) => createUrlPatternMatch(route.path).test(url.pathname));

  const value: RouterContext = {
    config: userConfig,
    history: config.history,
    href: config.href,
    pathname: config.pathname,
    outlet: outlet?.element,
    page: outlet,
    links: config.links
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};
