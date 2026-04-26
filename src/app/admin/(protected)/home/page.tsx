import { SingletonForm } from "@/components/admin/SingletonForm";
import type { AdminField } from "@/types/admin";

const fields: AdminField[] = [
  { name: "heroTitle", label: "Hero title", type: "text" },
  { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
  { name: "heroImage", label: "Hero image / video poster", type: "media" },
  { name: "heroPrimaryText", label: "Primary CTA text", type: "text" },
  { name: "heroPrimaryLink", label: "Primary CTA link", type: "text" },
  { name: "heroSecondaryText", label: "Secondary CTA text", type: "text" },
  { name: "heroSecondaryLink", label: "Secondary CTA link", type: "text" },
  { name: "servicesEnabled", label: "Show services section", type: "checkbox", defaultValue: true },
  { name: "servicesHeading", label: "Services heading", type: "text" },
  { name: "servicesDescription", label: "Services description", type: "textarea" },
  { name: "projectsEnabled", label: "Show projects section", type: "checkbox", defaultValue: true },
  { name: "projectsHeading", label: "Projects heading", type: "text" },
  { name: "projectsDescription", label: "Projects description", type: "textarea" },
  { name: "partnershipsEnabled", label: "Show partnerships section", type: "checkbox", defaultValue: true },
  { name: "partnershipsHeading", label: "Partnerships heading", type: "text" },
  { name: "partnershipsDescription", label: "Partnerships description", type: "textarea" },
  { name: "testimonialsEnabled", label: "Show testimonials section", type: "checkbox", defaultValue: true },
  { name: "testimonialsHeading", label: "Testimonials heading", type: "text" },
  { name: "testimonialsDescription", label: "Testimonials description", type: "textarea" },
  { name: "expertsEnabled", label: "Show experts section", type: "checkbox", defaultValue: true },
  { name: "expertsHeading", label: "Experts heading", type: "text" },
  { name: "expertsDescription", label: "Experts description", type: "textarea" },
  { name: "newsletterEnabled", label: "Show newsletter section", type: "checkbox", defaultValue: true },
  { name: "contactCtaHeading", label: "Contact CTA heading", type: "text" },
  { name: "contactCtaDescription", label: "Contact CTA description", type: "textarea" }
];

export default function HomeAdminPage() {
  return (
    <SingletonForm
      title="Home Page Content"
      description="Control the hero, CTA buttons, section visibility, headings, descriptions, and homepage highlights."
      endpoint="/api/admin/home"
      fields={fields}
    />
  );
}
