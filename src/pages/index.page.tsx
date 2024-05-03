import { routes } from "../links";
import { Link } from "../router/link";

export default function IndexPage() {
  return (
    <section>
      <h1>Eu sou a página index</h1>
      <Link href={routes.links.code} >Ir para Code Challenge</Link>
      <Link href={routes.links.userId} params={{ uuid: "123" }}>Ir para Detalhes de usuário</Link>
      <Link href="https://www.google.com.br">Ir para o Google</Link>
      <Link href={routes.links.index}>Permanecer na página</Link>
    </section>
  );
}
