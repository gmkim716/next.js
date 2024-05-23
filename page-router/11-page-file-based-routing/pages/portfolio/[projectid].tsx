import { useRouter } from "next/router";

export default function ProjectPage({ projectId }: { projectId: string }) {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return <div>Project Page {projectId}</div>;
}
