import { Outlet } from "./router/router";
import { useHistory } from "./router/hook.ts";

const NotFound = () => (
  <h1>Página não encontrada</h1>
);

export default function App() {
  const router = useHistory();

  return (
    <div>
      <Outlet notFound={<NotFound />} />
    </div>
  );
}
