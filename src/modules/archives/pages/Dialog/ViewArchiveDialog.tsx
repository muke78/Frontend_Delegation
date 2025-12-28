import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import type { ArchiveActionsType } from "@/modules/archives/types.ts";
import { Button } from "@/components/ui/button"

export const ViewArchiveDialog = ({ open, archiveId, archiveName, onClose }: ArchiveActionsType) => {
    
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogOverlay />
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Informacion acerca de {archiveName}</DialogTitle>
                    <DialogDescription>
                        Informacion sobre el archivo y sus referencias que tiene cargadas {archiveId}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"default"} onClick={onClose} className="cursor-pointer">
                            Aceptar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
