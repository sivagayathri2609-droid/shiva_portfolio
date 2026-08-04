import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/pages/Home/Home";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Siva Gayathri — UX/UI Designer & Frontend Developer" },
    { name: "description", content: "I'm Siva Gayathri — designing meaningful digital experiences with purpose, passion, and creativity." },
    { property: "og:title", content: "Siva Gayathri — UX/UI Designer" },
    { property: "og:description", content: "Portfolio home — UX/UI design and frontend development." },
  ]}),
  component: Home,
});
