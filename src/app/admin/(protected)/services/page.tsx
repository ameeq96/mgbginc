import { ResourceManager } from "@/components/admin/ResourceManager";
import { serviceConfig } from "@/components/admin/resource-configs";

export default function ServicesAdminPage() {
  return <ResourceManager config={serviceConfig} />;
}
