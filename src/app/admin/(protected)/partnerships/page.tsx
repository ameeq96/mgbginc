import { ResourceManager } from "@/components/admin/ResourceManager";
import { partnershipConfig } from "@/components/admin/resource-configs";

export default function PartnershipsAdminPage() {
  return <ResourceManager config={partnershipConfig} />;
}
