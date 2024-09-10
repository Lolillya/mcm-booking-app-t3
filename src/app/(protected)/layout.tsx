import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { createClient } from "~/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = async ({ children }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) redirect("/auth/login");

  return (
    <>
      <main className="flex grow-0">{children}</main>
    </>
  );
};

export default ProtectedRoute;
