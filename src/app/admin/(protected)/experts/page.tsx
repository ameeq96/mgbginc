import { ResourceManager } from "@/components/admin/ResourceManager";
import { expertConfig } from "@/components/admin/resource-configs";

export default function ExpertsAdminPage() {
  return <ResourceManager config={expertConfig} />;
}
