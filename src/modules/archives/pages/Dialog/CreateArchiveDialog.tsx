import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthContext } from "@/context/useAuthContext"
import { Icons } from "@/styles/Icons"


export const CreateArchiveDialog = () => {
    const { user } = useAuthContext();
    return (
        <>
            {/* Dialog para agregar archivo */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="gap-2 cursor-pointer">
                        <Icons.Plus className="h-4 w-4" />
                        Agregar archivo
                    </Button>
                </DialogTrigger>
                <DialogOverlay />
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Agregar nuevo archivo</DialogTitle>
                        <DialogDescription>
                            Complete la información del archivo. Los campos marcados con * son obligatorios.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="identifier" className="text-sm font-medium">
                                    Identificador <span className="text-destructive">*</span>
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
                                    Base <span className="text-destructive">*</span>
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
                                    Nombre del archivo <span className="text-destructive">*</span>
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
