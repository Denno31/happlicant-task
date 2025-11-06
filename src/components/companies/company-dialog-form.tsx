import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent } from "../ui/dialog"


interface CompanyDialogFormProps{
    open: boolean
    onClose: () => void
}


export default function CompanyDialogForm({open, onClose}: CompanyDialogFormProps){
    return (
        <Dialog open={open} onOpenChange={onClose}>
           <DialogContent>xx</DialogContent>
        </Dialog>
    )
}