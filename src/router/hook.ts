import React, { createContext, useContext } from "react";
import { History, Links, RoutesReadonly } from "./create-router.ts";

// contexto aplicado para o router, permitindo compartilhar o estado
// com todos os hooks e componentes filhos do router

export type RouterContext = {
  outlet?: React.ReactElement;
  history: History;
  pathname: string;
  href: string;
  links: Links<RoutesReadonly>;
};

export const context = createContext<RouterContext | undefined>(undefined);

export const useRouter = () => {
  const ctx = useContext(context);
  if (ctx === undefined) throw new Error("Context need the correct value");
  return ctx;
};

export const useHistory = () => useRouter().history;

export const useLinks = <Route extends RoutesReadonly>() => useRouter().links as Links<Route>;

type Location = {
  href: string;
  pathname: string;
}
export const useLocation = (): Location => {
  const router = useRouter();

  return {
    pathname: router.pathname,
    href: router.href
  };
};