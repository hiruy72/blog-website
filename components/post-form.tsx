"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import ImageUploader from "./image-uploader";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const CreatableSelect = dynamic(()=> import('react-select/creatable'), {ssr: false})



const formSchema = z.object({
    id: z.string().optional(),
    title: z.string('Title is required'),
    content: z.string('content is required'),
    imageUrl: z.string('Image URL is required'),
    catagoryId: z.string('Catagory is required'),
    tags: z.array(object({
        label: z.string(),
        value: z.string(),
    })),
    status:z.string(),
    
    slug: z.string('Slug is required'),
    catagories: z.array(z.object({id: z.string(), name: z.string()})).optional(),
})

export type FormValues=  z.infer<typeof formSchema>;

export default function PostForm({id,title,content,imageUrl,catagoryId,tags,status,slug,catagories}: FormValues) {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {id,title,content,imageUrl,catagoryId,tags,status,slug,catagories}
    })


     const onSubmit = async(data: FormValues)=> {
      // if {id} {
      //   // To Do
      // }
      // await cratePost{data}
      // toast.success("post createdd successfully")

      router.refresh()
      router.push("/posts")
     }
    return(
    <Form {...form}>
      <form className="grid grid-cols-2 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 py-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUploader
                   endpoint="imageUploader"
                    defaultUrl={field.value}
                    onChange={(url) => field.onChange(url)}
                />
              </FormControl>
              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Content" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <CreatableSelect
                isMulti
                isClearable
                {...field}
                onCreateOption={value=>{
                  const newOption = {
                    label: value,
                    value: value.toLocaleLowerCase()
                    }
                    field.onChange([...field.value, newOption])
                }}

                components={{IndicatorsContainer: ()=> null}}
                />
              </FormControl>
              
            </FormItem>
          )}
        />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Extra Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <FormField
                control={form.control}
                name="catagoryId"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Catagory</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange} defaultValue={catagoryId}>

                        <SelectTrigger className="w-full">
                          <SelectValue className="catagory"/>


                        </SelectTrigger>
                        <SelectContent>
                          {catagories?.map(catagory=>(
                            <SelectItem key={catagory.id} value={catagory.id}>
                              {catagory.name}
                            </SelectItem>
    ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
    )}
                />


                <FormField
                control={form.control}
                name="status"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange} defaultValue={status}>

                        <SelectTrigger className="w-full">
                          <SelectValue className="catagory"/>


                        </SelectTrigger>
                        <SelectContent>
                          {["Publish", "Draft"].map(status=>(
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
    ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
    )}
                />
            </CardContent>
            
          </Card>

        </div>

        <Button type="submit" className="max-w-40 cursor-pointer" disabled={!form.formState.isValid || form.formState.isSubmitting}> Save Changes</Button>
      </form>
    </Form>
    )

}