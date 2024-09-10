import { Button, Flex, Text } from "@radix-ui/themes"
import { logout } from "~/actions/actions"
import { createClient } from "~/utils/supabase/server"


const FormsPage = async () => {
    const supabase = createClient()

    const {data, error } = await supabase.auth.getUser()
    return (
        <>
            <Flex direction={"column"} justify={"center"} align={'center'}>
                <Text>Forms Page</Text>
                <Text>{JSON.stringify(data.user)}</Text>

                <form action={logout}>
                    <Button type="submit">Logout</Button>
                </form>
            </Flex>
        </>
    )
}

export default FormsPage