import React, { createContext, useContext } from "react";
import { History, Links, RoutesReadonly } from "./create-router.ts";

// contexto aplicado para o router, permitindo compartilhar o estado
// com todos os hooks e componentes filhos do router

type State = {
  outlet?: React.ReactElement;
  history: History;
  links: Links<RoutesReadonly>;
};

export const context = createContext<State | undefined>(undefined);

export const useRouter = () => {
  const ctx = useContext(context);
  if (ctx === undefined) throw new Error("Context need the correct value");
  return ctx;
};

export const useHistory = () => useRouter().history;

export const useLinks = <Route extends RoutesReadonly>() => useRouter().links as Links<Route>;