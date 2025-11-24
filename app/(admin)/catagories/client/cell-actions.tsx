import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Delete, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CellActions({id, name}: any){
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen]= useState(false)
    const router = useRouter()

    

    return(
        <>
        <div className="flex justify-end gap-6">
            <div className="cursor-pointer" title="Copy catagory Id" onClick={()=>{}}>
                <Copy/>
            </div>
           <div className="cursor-pointer" title="Edit" onClick={()=>{}}>
                <Edit/>
            </div>

            <div className="cursor-pointer" title="Delete" onClick={()=>{}}>
                <Trash/>
            </div>
        </div>

        <Dialog>
            <DialogContent className="sm:max-w-[425px] flex flex-col gap-6" aria-describedby="catagory" aria-description="delete catagory">

                <DialogHeader className="gap-6">
                    <DialogTitle>Delete Catagory</DialogTitle>
                    
                
                <DialogDescription className="flex flex-col">
                   <span className="text-md"> Are you sure you want to delete {name}</span>
                   <span> This action can't be undone</span>
                </DialogDescription>

                </DialogHeader>
                <Button variant="destructive" onClick={()=>{}} disabled={isLoading} className="max-w-40 self-end cursor-pointer">
                    Delete
                </Button>

            </DialogContent>
        </Dialog>
        </>
    )
}