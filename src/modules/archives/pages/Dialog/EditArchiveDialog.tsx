import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/styles/Icons"
import type { ArchiveActionsType } from "@/modules/archives/types.ts";
import { useArchiveEdit } from "@/modules/archives/hooks/useArchiveEdit.ts"


export const EditArchiveDialog = ({ open, archiveId, archiveName, onClose }: ArchiveActionsType) => {

    const { formEdit, setFormEdit, handleSubmitEdit } = useArchiveEdit({
        archiveId,
        onClose,
        open
    })

    const onmSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await handleSubmitEdit()
    };

    return (
        <>
            {/* Dialog para editar archivo */}
            <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
                <DialogOverlay />
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Editar el archivo {archiveName}</DialogTitle>
                        <DialogDescription>
                            Edite la informacion del archivo, los campos se pueden cambiar o dejarse asi, solo no deben quedar vacios
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onmSubmitEdit} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="identifier" className="text-sm font-medium">
                                    Identificador
                                </Label>
                                <Input
                                    id="identifier"
                                    type="text"
                                    value={formEdit.identifier}
                                    onChange={(e) => setFormEdit(prev => ({ ...prev, identifier: e.target.value.toUpperCase() }))}
                                    placeholder="ABC"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="base_folio" className="text-sm font-medium">
                                    Base
                                </Label>
                                <Input
                                    id="base_folio"
                                    type="text"
                                    value={formEdit.base_folio}
                                    placeholder="DYCCDC2528"
                                    onChange={(e) => setFormEdit(prev => ({ ...prev, base_folio: e.target.value.toUpperCase() }))}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Nombre del archivo
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formEdit.name}
                                    placeholder="Ingrese el nombre del archivo"
                                    onChange={(e) => setFormEdit(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="doc_type_edit" className="text-sm font-medium">
                                    Tipo de documento
                                </Label>
                                <Select value={formEdit.doc_type} onValueChange={(value) => setFormEdit(prev => ({ ...prev, doc_type: value }))}>
                                    <SelectTrigger id="doc_type_edit" className="w-full">
                                        <SelectValue placeholder="Seleccionar tipo de documento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Excel">Excel</SelectItem>
                                        <SelectItem value="PDF">PDF</SelectItem>
                                        <SelectItem value="Word">Word</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-sm font-medium">
                                    Año
                                </Label>
                                <Input
                                    id="year"
                                    value={formEdit.year}
                                    type="number"
                                    placeholder="YYYY"
                                    onChange={(e) =>
                                        setFormEdit(prev => ({ ...prev, year: e.target.value }))
                                    }
                                    min="1900"
                                    max="2099"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="storage_path" className="text-sm font-medium">
                                    Ruta de almacenamiento
                                </Label>
                                <Input
                                    id="storage_path"
                                    type="text"
                                    value={formEdit.storage_path}
                                    placeholder="/ruta/del/archivo"
                                    onChange={(e) =>
                                        setFormEdit(prev => ({ ...prev, storage_path: e.target.value }))
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="source_sheet" className="text-sm font-medium">
                                    Hoja fuente
                                </Label>
                                <Input
                                    id="source_sheet"
                                    type="text"
                                    value={formEdit.source_sheet}
                                    placeholder="Hoja 1"
                                    onChange={(e) =>
                                        setFormEdit(prev => ({ ...prev, source_sheet: e.target.value }))
                                    }
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
