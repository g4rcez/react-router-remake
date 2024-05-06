import { usePaths } from "../router/router";
import { links } from "../links";

export default function UserPage() {
  const paths = usePaths(links.userAddressId);
  console.log("paths", paths);
  return <h1>adsa</h1>;
}
