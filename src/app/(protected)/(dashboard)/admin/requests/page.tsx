import { createClient } from "~/utils/supabase/server";
import { prisma } from "~/server/db";

const AdminDashboard = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  // if (!user.data.user) return <Box>Access Denied</Box>;

  const requests = await prisma.requests.findMany({
    include: {
      profiles: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  const generateTable = requests.map((cell) => {
    const users = cell.profiles;

    return (
      <>test</>
      // <Table.Row key={cell.request_id} align={"center"}>
      //   <Table.ColumnHeaderCell>{users?.first_name}</Table.ColumnHeaderCell>
      //   <Table.ColumnHeaderCell>{users?.last_name}</Table.ColumnHeaderCell>
      //   <Table.Cell>{cell.purpose}</Table.Cell>
      //   <Table.Cell>
      //     <Box>{cell.start_date.toISOString().split("T")[0]}</Box>
      //     <Box>{cell.start_date.toTimeString().split(" ")[0]}</Box>
      //   </Table.Cell>
      //   <Table.Cell>
      //     <Box>{cell.end_date.toISOString().split("T")[0]}</Box>
      //     <Box>{cell.end_date.toTimeString().split(" ")[0]}</Box>
      //   </Table.Cell>
      //   <Table.Cell>
      //     <Flex direction={"column"}>
      //       <Text weight={"bold"}>Lecture Room</Text>
      //       <Text weight={"light"}>Chairs: 45</Text>
      //       <Text weight={"light"}>Table: 46</Text>
      //     </Flex>
      //   </Table.Cell>
      //   <Table.Cell>
      //     <Badge
      //       color={
      //         cell.status === "PENDING"
      //           ? "orange"
      //           : cell.status === "APPROVED"
      //             ? "green"
      //             : cell.status === "DISAPPROVED"
      //               ? "red"
      //               : cell.status === "EVALUATION"
      //                 ? "blue"
      //                 : "gray"
      //       }
      //       size={"3"}
      //     >
      //       {cell.status}
      //     </Badge>
      //   </Table.Cell>
      //   <Table.Cell>
      //     <Flex direction={"column"} gap={"3"}>
      //       <Button color={"green"} className="hover:cursor-pointer">
      //         Approve
      //       </Button>
      //       <Button color={"red"} className="hover:cursor-pointer">
      //         Disapprove
      //       </Button>
      //     </Flex>
      //   </Table.Cell>
      // </Table.Row>
    );
  });

  return (
    <></>
    // <Section className="z-0 w-full max-w-[85vw]">
    //   <Flex justify={"center"} align={"center"}>
    //     <Table.Root className="w-full" variant="surface">
    //       <Table.Header>
    //         <Table.Row align={"center"}>
    //           <Table.ColumnHeaderCell>Firstname</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>Lastname</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>Purpose</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>Particulars</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
    //           <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
    //         </Table.Row>
    //       </Table.Header>

    //       <Table.Body>{generateTable}</Table.Body>
    //     </Table.Root>
    //   </Flex>
    // </Section>
  );
};

export default AdminDashboard;
