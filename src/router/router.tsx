import React, {
  Fragment,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { CreateRouterConfig, History } from "./create-router";

type Props = React.PropsWithChildren<{ config: CreateRouterConfig }>;

type State = {
  outlet?: React.ReactElement;
  history: History;
};

// contexto aplicado para o router, permitindo compartilhar o estado
// com todos os hooks e componentes filhos do router
const context = createContext<State | undefined>(undefined);

export const useRouter = () => {
  const ctx = useContext(context);
  if (ctx === undefined) throw new Error("Context need the correct value");
  return ctx;
};

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

  const value = {
    history: config.history,
    // aqui vai precisar aplicar a lógica para pegar paths dinâmicos de acordo
    // com a regex fornecida na string. Escolher o padrão /users/<id:string> ou /users/:id
    // <id:string> -> ajuda na tipagem e trás mais explicito a intenção de uso
    // /:id -> tudo é string
    outlet: config.routes.find((route) => route.path === url.pathname)?.element,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};
