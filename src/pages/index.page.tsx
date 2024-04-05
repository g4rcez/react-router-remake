import { routes } from "../links";
import { Link } from "../router/link";

export default function IndexPage() {
  return (
    <section>
      <h1>Eu sou a página index</h1>
      <Link href={routes.links.code}>Ir para Code Challenge</Link>
    </section>
  );
}
