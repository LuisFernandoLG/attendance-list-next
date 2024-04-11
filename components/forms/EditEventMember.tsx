"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Button, buttonVariants } from "../ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { MemberItemFromPagination, eventMember } from "@/services/api/eventMember"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "react-query"

type Props = {
  id: string;
  name: string;
  email: string;
  details: string;
  eventId: number;
}

const formSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  details: z.string().min(1).max(50)
})

type FormSchema = z.infer<typeof formSchema>


export const EditEventMember = ({id, name, email, details, eventId}:Props)=>{
  const queryClient = useQueryClient()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: name,
      email: email,
      details: details
    }
  })
  const mutation = useMutation({
    mutationFn: async (values:{eventId: string, id:string, email:string, name:string, details:string})=>{
      try{
        const data = await eventMember().updateMember({
          eventId:String(values.eventId), 
          member: {id:values.id, name:values.name, email:values.email, details:values.details}
        })
  
        toast.success(`${data.item.name} was updated successfuly`)
        console.log(data)

        queryClient.invalidateQueries({
          queryKey:["membersPagination"]
        })


      
        // queryClient.setQueryData(['membersPagination', 1], (old:MemberItemFromPagination[] | undefined)=> {
        //   const oldData = old || []; // Provide a default value of an empty array if `old` is undefined
        //   // Rest of the code...
        //   console.log({oldData})


        //   const list = oldData.map((item)=> {
        //     if(item.id === data.item.id){
        //       const member: MemberItemFromPagination = {
        //         ...item,
        //         name: data.item.name,
        //         email: data.item.email,
        //         details: data.item.details
        //       }

        //       return member
        //     }
        //     return item
        //   })       

        //   return list
        // })
  
      }catch(error){
        console.log({error})
        if(error instanceof Error) toast.error(`something went wrong.`)
        else console.log("no Error Instance")
      }
    },

    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ["membersPagination"],
      });
    },

  })

  const handleSubmit = async (values:FormSchema)=>{
    mutation.mutate({...values, eventId:String(eventId), id:id})
  }

  return <Dialog>
  <DialogTrigger asChild>
  <Button size="icon" variant="outline">
  <Pencil1Icon className="h-4 w-4" />
  </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edición de miembro</DialogTitle>
      <DialogDescription>
        Una vez que termines, no olvides guardar los cambios.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
  <FormField
  control={form.control}
  name="name"
  render={({field})=>( <FormItem>
    <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
    </FormItem>)}
  />
  
  <FormField
  control={form.control}
  name="email"
  render={({field})=>( <FormItem>
    <FormLabel>email</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
    </FormItem>)}
  />

<FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detalles</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

  <Button loading={mutation.isLoading} disabled={mutation.isLoading}>
    Guardar cambios
  </Button>
  </form>
    </Form>
  </DialogContent>
</Dialog>
}