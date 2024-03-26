import { routes } from "../links";
import { Link } from "../router/link";
import { useLinks } from "../router/router";

export default function CodePage() {
  const links = useLinks<typeof routes.routes>();

  return (
    <section>
      <h1>Eu sou a página Code Challenge</h1>
      <Link href={links.index}>Ir para Index</Link>
    </section>
  );
}
