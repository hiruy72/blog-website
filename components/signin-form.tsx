import { Form } from "./ui/form"
export default function SiignInForm() {
  return (
   <Form>
       <form>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
        </FormItem>
    )}
    />
       </form>
   </Form>
  )
}
