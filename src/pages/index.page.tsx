import { routes } from "../links";
import { Link } from "../router/link";

export default function IndexPage() {
  return (
    <section>
      <h1>Eu sou a página index</h1>
      <Link href={routes.links.code}>Ir para Code Challenge</Link>
      <Link query={{ query: "Testing", id: 1000 }} href={routes.links.userId} params={{ uuid: "123" }}>
        Ir para Detalhes de usuário
      </Link>
      <Link href="https://www.google.com.br">Ir para o Google</Link>
      <Link href={routes.links.index}>Permanecer na página</Link>
      <Link
        href={"/users/<uuid:string>/address/<id:number>"}
        params={{ uuid: "777d1c6e-c97d-4b59-9f92-1307ac2eef6a", id: 1 }}
      >
        GoTo User
      </Link>
    </section>
  );
}
