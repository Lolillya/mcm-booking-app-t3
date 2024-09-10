import { ReactNode } from "react";
import SideBar from "~/app/components/sidebar";
import { createClient } from "~/utils/supabase/server";

interface ProtectedRouteLayoutProps {
  children: ReactNode;
}

const ProtectedRouteLayout: React.FC<ProtectedRouteLayoutProps> = async ({
  children,
}) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userRole = await prisma?.profiles.findFirst({
    where: {
      id: user.data.user?.id,
    },
    select: {
      role: true,
    },
  });
  // console.log(userRole?.role);
  return (
    <>
      {/* <Flex direction={"row"}> */}
      <SideBar role={userRole?.role} />
      {children}
      {/* </Flex> */}
    </>
  );
};

export default ProtectedRouteLayout;
