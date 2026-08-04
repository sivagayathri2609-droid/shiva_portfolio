import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/pages/About/About";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Siva Gayathri" },
    { name: "description", content: "About Siva Gayathri: UX/UI Designer and Frontend Developer with 1+ years crafting user-centered products." },
    { property: "og:title", content: "About — Siva Gayathri" },
    { property: "og:description", content: "About Siva Gayathri, UX/UI Designer & Frontend Developer." },
  ]}),
  component: About,
});
