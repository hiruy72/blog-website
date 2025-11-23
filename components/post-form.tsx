"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import ImageUploader from "./image-uploader";
import dynamic from "next/dynamic";

const CreatableSelect = dynamic(()=> import(
    'react-select/creatable', {ssr: false})
)


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
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {id,title,content,imageUrl,catagoryId,tags,status,slug,catagories}
    })
    return(
    <Form {...form}>
      <form >
        <div className="flex flex-col space-6">
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
               
              </FormControl>
              
            </FormItem>
          )}
        />
        </div>
    
      </form>
    </Form>
    )

}