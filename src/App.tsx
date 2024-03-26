import { useEffect } from "react";
import { Outlet, useHistory } from "./router/router";

const NotFound = () => (
  <h1>Página não encontrada</h1>
)

export default function App() {
  const router = useHistory();

  return (
    <div>
      <Outlet notFound={<NotFound />} />
    </div>
  );
}
