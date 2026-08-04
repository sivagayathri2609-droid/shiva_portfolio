import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/pages/Contact/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Siva Gayathri" },
    { name: "description", content: "Get in touch with Siva Gayathri for UX/UI design and frontend projects." },
    { property: "og:title", content: "Contact — Siva Gayathri" },
    { property: "og:description", content: "Contact form and details." },
  ]}),
  component: Contact,
});
