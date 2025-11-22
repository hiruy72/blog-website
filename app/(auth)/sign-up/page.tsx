import SignUpForm from "@/components/signup-form";
import { requireNoAuth } from "@/lib/auth-utils";

export default async function SignUpPage(){
  await requireNoAuth();
  return (
    <div className="flex items-center justify-center w-full h-dvh">
       <SignUpForm/>
    </div>
  )
}
