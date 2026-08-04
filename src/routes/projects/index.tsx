import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/pages/Projects/Projects";

export const Route = createFileRoute("/projects/")({
  component: Projects,
});
