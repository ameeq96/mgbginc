import { SingletonForm } from "@/components/admin/SingletonForm";
import type { AdminField } from "@/types/admin";

const fields: AdminField[] = [
  { name: "logo", label: "Logo", type: "media" },
  { name: "siteName", label: "Site name", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "contactEmail", label: "Contact email", type: "email" },
  { name: "phone", label: "Phone number", type: "text" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "linkedin", label: "LinkedIn", type: "url" },
  { name: "facebook", label: "Facebook", type: "url" },
  { name: "instagram", label: "Instagram", type: "url" },
  { name: "x", label: "X / Twitter", type: "url" },
  { name: "youtube", label: "YouTube", type: "url" },
  { name: "footerText", label: "Footer text", type: "textarea" },
  { name: "seoTitle", label: "SEO meta title", type: "text" },
  { name: "seoDescription", label: "SEO meta description", type: "textarea" }
];

export default function SettingsPage() {
  return (
    <SingletonForm
      title="Website Settings"
      description="Manage logo, contact information, social links, footer copy, and global SEO defaults."
      endpoint="/api/admin/settings"
      fields={fields}
    />
  );
}
