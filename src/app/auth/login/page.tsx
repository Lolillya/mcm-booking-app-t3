"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "~/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { login } from "~/actions/actions";

import { Input } from "~/components/ui/input";

import MMCMLOGO from "../../img/MMCM_Logo.svg";
import Image from "next/image";
import { Button } from "~/components/ui/button";

const LoginPage = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    values.email = values.email + "@mcm.edu.ph";
    console.log("email: ", values.email);
    console.log("password: ", values.password);
    startTransition(async () => {
      try {
        await login({ email: values.email, password: values.password });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <section className="flex h-screen items-center justify-center">
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full max-w-[300px] flex-col items-center justify-center gap-y-5 rounded-lg border bg-slate-200 p-5 shadow-md">
              <Image src={MMCMLOGO} alt="School Logo" width={250} />
              <h3>Login</h3>
              <Input
                placeholder="username or email"
                required
                {...form.register("email")}
              />
              <Input
                placeholder="password"
                type="password"
                required
                {...form.register("password")}
              />

              <Button>Login</Button>
            </div>
          </form>
        </div>
      </section>
      {/* <Section className="flex h-full w-full items-center justify-center">
        <Box>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex
              direction={"column"}
              justify={"center"}
              align={"center"}
              gapY={"5"}
              className="rounded-lg border bg-slate-200 p-5 shadow-md"
            >
              <Image src={MMCMLOGO} alt="School logo" width={300} />
              <Heading weight={"regular"}>Login</Heading>
              <TextField.Root
                size={"3"}
                placeholder="Username"
                required
                className="w-full"
                {...form.register("email")}
              >
                <TextField.Slot side="left">
                  <PersonIcon />
                </TextField.Slot>
              </TextField.Root>

              <TextField.Root
                size={"3"}
                placeholder="Password"
                type="password"
                className="w-full"
                required
                {...form.register("password")}
              >
                <TextField.Slot side="left">
                  <LockClosedIcon />
                </TextField.Slot>

                <TextField.Slot side="right" className="hover:cursor-pointer">
                  <EyeClosedIcon />
                </TextField.Slot>
              </TextField.Root>

              <Button size={"3"} type="submit" className="hover:cursor-pointer">
                Login
              </Button>
            </Flex>
          </form>
        </Box>
      </Section> */}
    </>
  );
};

export default LoginPage;
