"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUserById } from "~/data/user";
import { LoginSchema } from "~/schemas";
import { createClient } from "~/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function login(formData: z.infer<typeof LoginSchema>) {
  const supabase = createClient();

  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) throw new Error("Invalid input");

  const user = {
    email: validatedFields.data.email as string,
    password: validatedFields.data.password as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    console.log("error: ", error);
    return;
  }

  const userData = await getUserById(data.user.id);

  // const

  // console.log(userData?.role);

  revalidatePath("/", "layout");

  switch (userData?.role) {
    case "ADMIN":
      redirect("/admin/requests");
    case "FACULTY":
      redirect("/faculty");
    default:
      redirect("/forms-page");
  }
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}
