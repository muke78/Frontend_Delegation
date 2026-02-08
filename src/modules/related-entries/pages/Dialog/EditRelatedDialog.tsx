import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/styles/Icons";
import type { RelatedActionsType } from "../../types";

export const EditRelatedDialog = ({ open, archiveId, relatedDescription, relatedId, onClose }: RelatedActionsType) => {
    return (
        <>
            {/* Dialog para editar una relacion */}
            <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
                <DialogOverlay />
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Editar la relacion {relatedDescription}
                        </DialogTitle>
                        <DialogDescription>
                            Edite la informacion de la relacion, los campos se pueden cambiar o dejarse asi, solo no deben de quedar vacios
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Descripcion
                                </Label>
                                <Input
                                    id="identifier"
                                    type="text"
                                    // value={formEdit.identifier}
                                    // onChange={(e) =>
                                    // 	setFormEdit((prev) => ({
                                    // 		...prev,
                                    // 		identifier: e.target.value.toUpperCase(),
                                    // 	}))
                                    // }
                                    placeholder="ABC"
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex gap-2">
                            <DialogClose>
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                <Icons.Save className="h-4 w-4 mr-2" />
                                Editar relacion
                            </Button>

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
