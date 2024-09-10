import { redirect, usePathname } from "next/navigation";

export const GetPathname = (path: string) => {
  const pathname = usePathname();

  return pathname === path;
};

export const redirectTo = (link: string) => {
  redirect(link);
};
