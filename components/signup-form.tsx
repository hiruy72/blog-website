"use client"

import { set, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { se } from "date-fns/locale"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Spinner } from "./ui/spinner"
import Link from "next/link"
import { Separator } from "./ui/separator"

// Zod schema
const signupFormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()

}).refine((data)=> data.password === data.confirmPassword,{
  message: "Passwords do not match", 
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signupFormSchema>


export default function SignUpForm() {
      const [isLoading, setIsLoading] = useState(false)
     const router = useRouter()
      const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit =async (values: SignUpFormValues) =>{
    try {
      setIsLoading(true)
      await authClient.signUp.email({
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },{
        onSuccess: () => {
          toast.success("Account Created successfully")
          router.push("/")
        }
        ,
        onError: (ctx) => {
          toast.error(ctx.error.message)

        }
      })
      
    } catch (error) {
      console.log(error)
      
    }finally{
         setIsLoading(false)
    }

}

  const signInWithGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
  })
  }

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  return (

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
       
      
      </CardHeader>
      <CardContent>
               <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                   
                    <FormMessage />
        </FormItem>
    )}
    />
     <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your Password" {...field} type="password"/>
                    </FormControl>
                   
                    <FormMessage />
        </FormItem>
        
    )}
    />
     <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your Password" {...field} type="password"/>
                    </FormControl>
                   
                    <FormMessage />
        </FormItem>
        
    )}
    />
    <Button type="submit" className="cursor-pointer"> 
      {isLoading ? <Spinner/> :  "Sign Up"}
    </Button>
    <p>
      Already have and account ? {" "}
      <Link href="/sign-in" className="text-blue-900"> Signin</Link>
    </p>

     <Separator/>
      <Button type="button" className="text-[13px] cursor-pointer" onClick={signInWithGithub}> Continue With Github </Button>
      <Button type="button" className="text-[13px] cursor-pointer" onClick={signInWithGoogle}> Continue With Google </Button>
 
       </form>
   </Form>
      </CardContent>
     
    </Card>
   
  )
}


