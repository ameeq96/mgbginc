import { ResourceManager } from "@/components/admin/ResourceManager";
import { testimonialConfig } from "@/components/admin/resource-configs";

export default function TestimonialsAdminPage() {
  return <ResourceManager config={testimonialConfig} />;
}
