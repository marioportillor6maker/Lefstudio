import { redirect } from "next/navigation";

export default function CatalogosRedirect() {
  redirect("/admin?tab=catalogos");
}
