import { createFileRoute } from "@tanstack/react-router";
import { Reviews } from "@/components/pages/Reviews/Reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [
    { title: "Reviews — Siva Gayathri" },
    { name: "description", content: "What clients say about working with Siva Gayathri." },
    { property: "og:title", content: "Reviews — Siva Gayathri" },
    { property: "og:description", content: "Client testimonials." },
  ]}),
  component: Reviews,
});
