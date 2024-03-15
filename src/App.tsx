import { useEffect } from "react";
import { Outlet, useHistory } from "./router/router";

export default function App() {
  const router = useHistory();

  return (
    <div>
      <Outlet />
    </div>
  );
}
