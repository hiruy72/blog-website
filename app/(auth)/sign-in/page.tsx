import SignInForm from "@/components/signin-form";
import { requireNoAuth } from "@/lib/auth-utils";

export default async function SignInPage(){
  await requireNoAuth();
  return (
    <div className="flex items-center justify-center w-full h-dvh">
       <SignInForm/>
    </div>
  )
}
