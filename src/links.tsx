import CodePage from "./pages/code.page";
import IndexPage from "./pages/index.page";
import UserPage from "./pages/user.page";
import { createRouter } from "./router/create-router";

export const routes = createRouter(
  [
    {
      element: <IndexPage />,
      id: "index",
      path: "/"
    },
    {
      element: <CodePage />,
      id: "code",
      path: "/code-challenge"
    },
    {
      element: <h1>AAAAAAAAaa</h1>,
      id: "variable",
      path: "/<id:number>"
    },
    {
      element: <UserPage />,
      id: "userId",
      path: "/users/<uuid:string>?query=string&id=number"
    },
    {
      element: <UserPage />,
      id: "userAddressId",
      path: "/users/<uuid:string>/address/<id:number>"
    }
  ],
  {
    pathsParser: {
      match: { class: "[^/:]" },
      map: { class: (str: string) => ({ class: str }) }
    }
  }
);

export const links = routes.links;

export const useLinks = routes.useLinks;
