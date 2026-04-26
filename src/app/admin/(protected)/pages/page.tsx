import { ResourceManager } from "@/components/admin/ResourceManager";
import { pageConfig, usefulLinkConfig } from "@/components/admin/resource-configs";

export default function PagesAdminPage() {
  return (
    <div className="grid gap-6">
      <ResourceManager config={pageConfig} />
      <ResourceManager config={usefulLinkConfig} />
    </div>
  );
}
