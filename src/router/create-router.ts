import React from "react";

type RouteConfig = {
  id: string;
  path: `/${string}`;
  element: React.ReactElement;
} & Partial<{}>;

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
    this.callListeners();
    this.h.pushState(state || {}, "", url);
    console.log("PUSH ->", url);
  }
}

export const createRouter = <T extends readonly RouteConfig[]>(routes: T) => {
  const history = new History(window.history);
  return { history, routes };
};

export type CreateRouterConfig = ReturnType<typeof createRouter>;
