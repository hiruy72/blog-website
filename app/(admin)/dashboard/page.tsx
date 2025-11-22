import { requireAuth } from "@/lib/auth-utils"

export default async function dashboardPage() {
  await requireAuth();
  return (
    <div>
       <h1>Dashboard page </h1>
    </div>
  )
}
