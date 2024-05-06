import React from "react";

type Listener = (url: string) => void;

export class History {
  public constructor(private h: globalThis.History) {}

  public listeners: Set<Listener> = new Set();

  private callListeners() {
    this.listeners.forEach((listener) => {
      listener(window.location.href);
    });
  }

  public removeEventListener(listener: Listener) {
    console.log("REMOVE");
    this.listeners.delete(listener);
  }

  public addEventListener(listener: Listener) {
    console.log("ADD");
    this.listeners.add(listener);
  }

  public push(url: string, state?: object) {
    this.h.pushState(state || {}, "", url);
    this.callListeners();
    console.log("PUSH ->", url);
  }
}

export type Route = {
  id: string;
  path: `/${string}`;
  element: React.ReactElement;
};

export type RoutesReadonly = readonly Route[];

export type Links<Routes extends RoutesReadonly> = {
  [ID in Routes[number]["id"]]: Extract<Routes[number], { id: ID }>["path"];
};

export type Config = Partial<{
  pathsParser: Partial<{
    match: Record<string, string>;
    map: Record<string, (str: string) => any>;
  }>;
}>;

export type CreateRouter<Routes extends RoutesReadonly, C extends Config> = {
  config?: C;
  history: History;
  routes: Routes;
  pathname: string;
  href: string;
  links: Links<Routes>;
  useLinks: () => Links<Routes>;
};

export const createRouter = <const Routes extends RoutesReadonly, C extends Config>(
  routes: Routes,
  config?: C
): CreateRouter<Routes, Config> => {
  const history = new History(window.history);
  const links = routes.reduce((acc, route) => ({ ...acc, [route.id]: route.path }), {} as Links<Routes>);
  const location = window.location;
  const useLinks = () => links;
  return { history, useLinks, routes, links, href: location.href, pathname: location.pathname, config };
};
