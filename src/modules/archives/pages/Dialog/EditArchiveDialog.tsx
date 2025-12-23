import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/styles/Icons"
import type { UUID } from "../../types"

type Props = {
    open: boolean
    archiveId?: UUID
    onClose: () => void
}

export const EditArchiveDialog = ({ open,
    archiveId,
    onClose }: Props) => {
    return (
        <>
            {/* Dialog para editar archivo */}
            <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
                <DialogOverlay />
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Editar el archivo {archiveId}</DialogTitle>
                        <DialogDescription>
                            Edite la informacion de el archivo, los campos que guste editar se pueden cambiar
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="identifier" className="text-sm font-medium">
                                    Identificador
                                </Label>
                                <Input
                                    id="identifier"
                                    name="identifier"
                                    placeholder="ABC"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="base" className="text-sm font-medium">
                                    Base
                                </Label>
                                <Input
                                    id="base"
                                    name="base"
                                    placeholder="DYCCDC2528"
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Nombre del archivo
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Ingrese el nombre del archivo"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="docType" className="text-sm font-medium">
                                    Tipo de documento
                                </Label>
                                <Select name="docType" required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="excel">Excel</SelectItem>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                        <SelectItem value="word">Word</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-sm font-medium">
                                    Año
                                </Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    placeholder="YYYY"
                                    required
                                    min="1900"
                                    max="2099"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="storagePath" className="text-sm font-medium">
                                    Ruta de almacenamiento
                                </Label>
                                <Input
                                    id="storagePath"
                                    name="storagePath"
                                    placeholder="/ruta/del/archivo"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sourceSheet" className="text-sm font-medium">
                                    Hoja fuente
                                </Label>
                                <Input
                                    id="sourceSheet"
                                    name="sourceSheet"
                                    placeholder="Hoja 1"
                                />
                            </div>
                        </div>

                        <DialogFooter className="flex gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                <Icons.Save className="h-4 w-4 mr-2" />
                                Editar archivo
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
