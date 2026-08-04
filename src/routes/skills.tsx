import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/components/pages/Skills/Skills";

export const Route = createFileRoute("/skills")({
  head: () => ({ meta: [
    { title: "Skills — Siva Gayathri" },
    { name: "description", content: "Design and development skills: Figma, Adobe XD, HTML/CSS/JS, React, Bootstrap." },
    { property: "og:title", content: "Skills — Siva Gayathri" },
    { property: "og:description", content: "Design tools, development tools, and skill proficiency." },
  ]}),
  component: Skills,
});
