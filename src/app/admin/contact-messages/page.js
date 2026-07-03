import { redirect } from "next/navigation";

import ContactMessagesManager from "../../../components/admin/ContactMessagesManager";
import { getAdminSession } from "../../../utils/admin-session";

export default async function AdminContactMessagesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <ContactMessagesManager />;
}