import CodePage from "./pages/code.page";
import IndexPage from "./pages/index.page";
import { createRouter } from "./router/create-router";

export const routes = createRouter([
  {
    element: <IndexPage />,
    id: "index",
    path: "/",
  },
  {
    element: <CodePage />,
    id: "code",
    path: "/code-challenge",
  },
]);

export const useLinks = routes.useLinks

console.log(routes.links.code) // Output: "/code-challenge"