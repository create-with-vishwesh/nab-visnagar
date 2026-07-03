import { redirect } from "next/navigation";

import WebsiteSettingsManager from "../../../components/admin/WebsiteSettingsManager";
import { getAdminSession } from "../../../utils/admin-session";

export default async function AdminWebsiteSettingsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <WebsiteSettingsManager />;
}