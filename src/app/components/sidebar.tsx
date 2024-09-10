"use client";

import MMCMLOGO from "../img/MMCM_Logo.svg";
import Image from "next/image";
import { logout } from "~/actions/actions";
import { GetPathname } from "../api/getRoute";
import { roles } from "@prisma/client";
import { Button } from "~/components/ui/button";

interface SideBarProps {
  role: roles | undefined;
}

const SideBar: React.FC<SideBarProps> = ({ role }) => {
  const requestWindowActive = GetPathname("/admin/requests");
  const calendarWindowActive = GetPathname("/admin/calendar");
  const logsWindowActive = GetPathname("/admin/logs");
  console.log(role);

  return (
    <section className="z-10 h-screen max-h-full w-64 overflow-hidden bg-slate-200 p-0 shadow-lg">
      <div className="justify-centera flex flex-col items-center">
        <Image src={MMCMLOGO} alt="MMCM Logo" width={200} />

        <div className="flex flex-col items-center justify-center">
          <ul className="m-6 flex w-fit flex-col gap-2">
            <div
              className={`flex hover:cursor-pointer hover:bg-red-500 hover:text-white ${requestWindowActive ? "bg-red-500 text-white" : ""} rounded-full`}
            >
              <div className="flex items-center justify-center">
                <li className="w-full p-2 text-center font-medium">Requests</li>
              </div>
            </div>

            <div
              className={`flex hover:cursor-pointer hover:bg-red-500 hover:text-white ${calendarWindowActive ? "bg-red-500 text-white" : ""} rounded-full`}
            >
              <div className="flex items-center justify-center">
                <li className="w-full p-2 text-center font-medium">Calendar</li>
              </div>
            </div>

            <div
              className={`flex hover:cursor-pointer hover:bg-red-500 hover:text-white ${logsWindowActive ? "bg-red-500 text-white" : ""} rounded-full`}
            >
              <div className="flex items-center justify-center">
                <li className="w-full p-2 text-center font-medium">Logs</li>
              </div>
            </div>

            <form action={logout}>
              <Button>Logout</Button>
            </form>
          </ul>
        </div>
      </div>
    </section>
    // <Section className="z-10 h-screen max-h-full w-64 overflow-hidden bg-slate-200 p-0 shadow-lg">
    //   <Flex direction={"column"} justify={"center"} align={"center"}>
    //     <Box>
    //       <Image src={MMCMLOGO} alt="MMCM Logo" width={200} />

    //       <Flex direction={"column"} justify={"center"} align={"center"}>
    //         <ul className="m-6 flex w-full flex-col gap-2">
    //           <Flex
    //             className={`hover:cursor-pointer hover:bg-red-500 hover:text-white ${requestWindowActive ? "bg-red-500 text-white" : ""} rounded-full`}
    //           >
    //             <Flex align={"center"} className="ml-10">
    //               <ClipboardIcon />
    //               <li className="w-full p-2 font-medium">Requests</li>
    //             </Flex>
    //           </Flex>

    //           <Flex
    //             className={`rounded-full hover:cursor-pointer hover:bg-red-500 hover:text-white ${calendarWindowActive ? "bg-red-500 text-white" : ""}`}
    //           >
    //             <Flex align={"center"} className="ml-10">
    //               <CalendarIcon />
    //               <li className="w-full p-2 font-medium">Calendar</li>
    //             </Flex>
    //           </Flex>

    //           <Flex
    //             className={`rounded-full hover:cursor-pointer hover:bg-red-500 hover:text-white ${logsWindowActive ? "bg-red-500 text-white" : ""}`}
    //           >
    //             <Flex align={"center"} className="ml-10">
    //               <FileIcon width={"20px"} />
    //               <li className="w-full p-2 font-medium">Logs</li>
    //             </Flex>
    //           </Flex>
    //         </ul>
    //       </Flex>
    //     </Box>

    //     <Box className="mb-10">
    //       <form action={logout}>
    //         <Button
    //           className="p-7 hover:cursor-pointer"
    //           size={"3"}
    //           variant="soft"
    //           color="red"
    //           radius="full"
    //         >
    //           <ExitIcon />
    //           Logout
    //         </Button>
    //       </form>
    //     </Box>
    //   </Flex>
    // </Section>
  );
};

export default SideBar;
