import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Icons } from "@/styles/Icons"

export const FiltersApp = () => {
    return (
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Identificador */}
            <Field>
                <FieldLabel className="text-sm font-medium mb-2">Identificador</FieldLabel>
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        placeholder="ABC"
                        className="pl-10 h-10"
                    />
                </div>
            </Field>

            {/* Base */}
            <Field>
                <FieldLabel className="text-sm font-medium mb-2">Base</FieldLabel>
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        placeholder="DYCCDC2528"
                        className="pl-10 h-10"
                    />
                </div>
            </Field>

            {/* Nombre */}
            <Field>
                <FieldLabel className="text-sm font-medium mb-2">Nombre</FieldLabel>
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        placeholder="Nombre del archivo"
                        className="pl-10 h-10"
                    />
                </div>
            </Field>

            {/* Año */}
            <Field>
                <FieldLabel className="text-sm font-medium mb-2">Año</FieldLabel>
                <Input
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2099"
                    className="h-10"
                />
            </Field>

            {/* Tipo de Archivo */}
            <Field>
                <FieldLabel className="text-sm font-medium mb-2">Tipo</FieldLabel>
                <Select>
                    <SelectTrigger className="cursor-pointer h-10">
                        <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tipos de archivo</SelectLabel>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="word">Word</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            {/* Usuario */}
            <Field >
                <FieldLabel className="text-sm font-medium mb-2">Creado por</FieldLabel>
                <Select>
                    <SelectTrigger className="cursor-pointer h-10">
                        <SelectValue placeholder="Seleccionar usuario" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Usuarios</SelectLabel>
                            <SelectItem value="user1">Usuario 1</SelectItem>
                            <SelectItem value="user2">Usuario 2</SelectItem>
                            <SelectItem value="user3">Usuario 3</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
}
