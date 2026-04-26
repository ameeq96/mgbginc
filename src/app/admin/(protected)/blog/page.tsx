import { ResourceManager } from "@/components/admin/ResourceManager";
import { blogConfig } from "@/components/admin/resource-configs";

export default function BlogAdminPage() {
  return <ResourceManager config={blogConfig} />;
}
