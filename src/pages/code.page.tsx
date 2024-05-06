import { useLinks } from "../links";
import { Link } from "../router/link";

export default function CodePage() {
  const links = useLinks();
  return (
    <section>
      <h1>Eu sou a página Code Challenge</h1>
      <Link href={links.index}>Ir para Index</Link>
    </section>
  );
}
