import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetails } from "@/components/pages/ProjectDetails/ProjectDetails";

export const Route = createFileRoute("/projects/$id")({
  head: () => ({ meta: [
    { title: "Project Case Study — Siva Gayathri" },
    { name: "description", content: "In-depth case study of a UX/UI project." },
    { property: "og:title", content: "Project Case Study — Siva Gayathri" },
    { property: "og:description", content: "Design process, problem, solution, and outcomes." },
  ]}),
  component: ProjectDetails,
});
