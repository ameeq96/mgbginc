import { ResourceManager } from "@/components/admin/ResourceManager";
import { projectConfig } from "@/components/admin/resource-configs";

export default function ProjectsAdminPage() {
  return <ResourceManager config={projectConfig} />;
}
