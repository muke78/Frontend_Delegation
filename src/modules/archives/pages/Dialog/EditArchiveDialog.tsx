import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/styles/Icons"
import type { ArchiveActions } from "../../types"
import { useArchiveContext } from "../../context/useArchiveContext"
import { toast } from "sonner"
import type { ApiError } from "@/services/api/types"
import { listArchivesById, updateArchive } from "../../services/archive.services"
import { useEffect } from "react"

export const EditArchiveDialog = ({ open, archiveId, archiveName, onClose }: ArchiveActions) => {
    const { form, setForm, refresh } = useArchiveContext()

    const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const payload = {
                identifier: form.identifier,
                base_folio: form.base_folio,
                name: form.name,
                doc_type: form.doc_type,
                year: form.year,
                source_sheet: form.source_sheet,
                storage_path: form.storage_path,
            }

            const res = await updateArchive(archiveId, payload)
            await refresh();
            toast.success(res.message)
            onClose()
        } catch (error) {
            const err = error as ApiError

            if (err.type === "validation") {
                err.errors.forEach(e => {
                    toast.error(`${e.field}: ${e.message}`, {
                        duration: 10000,
                    })
                })
            } else {
                toast.error(err.message, { duration: 7000 })
            }
        }
    };

    useEffect(() => {
        if (!open || !archiveId) return

        const getArchiveById = async () => {
            try {
                const res = await listArchivesById(archiveId)
                toast.success(res.message)
                const archive = res.data[0]

                if (archive) {
                    setForm({
                        identifier: archive.identifier,
                        base_folio: archive.base_folio,
                        name: archive.name,
                        doc_type: archive.doc_type,
                        year: archive.year,
                        storage_path: archive.storage_path,
                        source_sheet: archive.source_sheet
                    })
                } else {
                    toast.error(`No se encontró el archivo con ID ${archiveId}`)
                    onClose()
                }
            } catch (error) {

                const err = error as ApiError

                if (err.type === "validation") {
                    err.errors.forEach(e => {
                        toast.error(`${e.field}: ${e.message}`, {
                            duration: 10000,
                        })
                    })
                } else {
                    toast.error(err.message, { duration: 7000 })
                }

            }
        }

        getArchiveById()
    }, [open, archiveId, setForm, onClose])


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

                    <form onSubmit={handleSubmitEdit} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="identifier" className="text-sm font-medium">
                                    Identificador
                                </Label>
                                <Input
                                    id="identifier"
                                    type="text"
                                    value={form.identifier}
                                    onChange={(e) => setForm(prev => ({ ...prev, identifier: e.target.value.toUpperCase() }))}
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
                                    value={form.base_folio}
                                    placeholder="DYCCDC2528"
                                    onChange={(e) => setForm(prev => ({ ...prev, base_folio: e.target.value.toUpperCase() }))}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Nombre del archivo
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={form.name}
                                    placeholder="Ingrese el nombre del archivo"
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="doc_type" className="text-sm font-medium">
                                    Tipo de documento
                                </Label>
                                <Select value={form.doc_type} onValueChange={(value) => setForm(prev => ({ ...prev, doc_type: value }))}>
                                    <SelectTrigger id="doc_type" className="w-full">
                                        <SelectValue placeholder="Seleccionar tipo de documento" />
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
                                    value={form.year}
                                    type="number"
                                    placeholder="YYYY"
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, year: e.target.value }))
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
                                    value={form.storage_path}
                                    placeholder="/ruta/del/archivo"
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, storage_path: e.target.value }))
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
                                    value={form.source_sheet}
                                    placeholder="Hoja 1"
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, source_sheet: e.target.value }))
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
