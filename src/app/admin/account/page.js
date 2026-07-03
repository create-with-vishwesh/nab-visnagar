import { redirect } from "next/navigation";

import AccountSettings from "../../../components/admin/AccountSettings";
import { getAdminSession } from "../../../utils/admin-session";

export default async function AdminAccountPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AccountSettings />;
}
