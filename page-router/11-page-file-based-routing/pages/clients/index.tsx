import { useRouter } from "next/router";

export default function ClientsPage() {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler() {
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The Client Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
