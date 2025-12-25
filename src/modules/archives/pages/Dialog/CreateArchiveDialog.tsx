import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthContext } from "@/context/useAuthContext"
import type { ApiError } from "@/services/api/types"
import { Icons } from "@/styles/Icons"
import { useState } from "react"
import { toast } from "sonner"
import { createArchive } from "../../services/archive.services"
import { useArchiveContext } from "../../context/useArchiveContext"


export const CreateArchiveDialog = () => {
    const { user } = useAuthContext();
    const { refresh } = useArchiveContext()

    const [form, setForm] = useState({
        identifier: "",
        base: "DYCCDC2528",
        name: "",
        docType: "",
        year: "",
        storagePath: "",
        sourceSheet: "",
    })

    const [openDialog, setOpenDialog] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await createArchive({
                identifier: form.identifier,
                base_folio: form.base,
                name: form.name,
                doc_type: form.docType,
                year: form.year,
                source_sheet: form.sourceSheet,
                storage_path: form.storagePath,
                created_by: user?.user_id,
            })
            await refresh();
            toast.success(res.message)
            setOpenDialog(false)
            setForm({
                identifier: "",
                base: "DYCCDC2528",
                name: "",
                docType: "",
                year: "",
                storagePath: "",
                sourceSheet: "",
            })
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

    return (
        <>
            {/* Dialog para agregar archivo */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button className="gap-2 cursor-pointer">
                        <Icons.Plus className="h-4 w-4" />
                        Agregar archivo
                    </Button>
                </DialogTrigger>
                <DialogOverlay />
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Agregar nuevo archivo</DialogTitle>
                        <DialogDescription>
                            Complete la información del archivo. Los campos marcados con <span className="text-destructive">*</span> son obligatorios.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="identifier" className="text-sm font-medium">
                                    Identificador <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    value={form.identifier}
                                    onChange={(e) => setForm(prev => ({ ...prev, identifier: e.target.value.toUpperCase() }))}
                                    placeholder="ABC"
                                    required

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="base" className="text-sm font-medium">
                                    Base <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    value={form.base}
                                    onChange={(e) => setForm(prev => ({ ...prev, base: e.target.value.toUpperCase() }))}
                                    placeholder="DYCCDC2528"
                                    required

                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Nombre del archivo <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, name: e.target.value.toUpperCase() }))
                                    }
                                    placeholder="Ingrese el nombre del archivo"
                                    required

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="docType" className="text-sm font-medium">
                                    Tipo de documento
                                </Label>
                                <Select value={form.docType} onValueChange={(value) => setForm(prev => ({ ...prev, docType: value }))}>
                                    <SelectTrigger className="w-full" value={form.docType}>
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
                                    type="number"
                                    value={form.year}
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, year: e.target.value }))
                                    }
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
                                    type="text"
                                    value={form.storagePath}
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, storagePath: e.target.value }))
                                    }
                                    placeholder="/ruta/del/archivo"

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sourceSheet" className="text-sm font-medium">
                                    Hoja fuente
                                </Label>
                                <Input
                                    type="text"
                                    value={form.sourceSheet}
                                    onChange={(e) =>
                                        setForm(prev => ({ ...prev, sourceSheet: e.target.value }))
                                    }
                                    placeholder="Hoja 1"

                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userId" className="text-sm font-medium">
                                    Usuario que lo crea
                                </Label>
                                <Input
                                    id="userId"
                                    name="userId"
                                    defaultValue={user?.username}
                                    disabled
                                    className="bg-muted"
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
                                Guardar archivo
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}
