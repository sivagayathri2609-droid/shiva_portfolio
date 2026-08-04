import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Projects } from "@/components/pages/Projects/Projects";

// This layout route renders:
// - Projects list when at /projects (no $id param)
// - ProjectDetails (via Outlet) when at /projects/$id
function ProjectsLayout() {
  // If there's no $id param, show the projects list
  // The Outlet handles /projects/$id rendering ProjectDetails
  return <Outlet />;
}

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [
    { title: "Projects — Siva Gayathri" },
    { name: "description", content: "Selected UX/UI design and development projects." },
    { property: "og:title", content: "Projects — Siva Gayathri" },
    { property: "og:description", content: "Case studies of design and development work." },
  ]}),
  component: ProjectsLayout,
});
