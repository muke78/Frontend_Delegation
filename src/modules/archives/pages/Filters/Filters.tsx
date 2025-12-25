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
import { useArchiveContext } from "../../context/useArchiveContext"

export const FiltersApp = () => {
    const { filters, setFilters } = useArchiveContext()

    return (
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Identificador */}
            <Field>
                <FieldLabel htmlFor="identifier" className="text-sm font-medium">Identificador</FieldLabel>
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        id="identifier"
                        type="text"
                        value={filters.identifier}
                        onChange={(e) => setFilters(prev => ({ ...prev, identifier: e.target.value.toUpperCase() }))}
                        placeholder="ABC"
                        className="pl-10"
                    />
                </div>
            </Field>

            {/* Base */}
            <Field>
                <FieldLabel htmlFor="base_folio" className="text-sm font-medium">Base</FieldLabel>
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        id="base_folio"
                        type="text"
                        value={filters.base_folio}
                        onChange={(e) => setFilters(prev => ({ ...prev, base_folio: e.target.value.toUpperCase() }))}
                        placeholder="DYCCDC2528"
                        className="pl-10"
                    />
                </div>
            </Field>

            {/* Nombre */}
            <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium">Nombre</FieldLabel>
                <div className="relative">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        id="name"
                        type="text"
                        value={filters.name}
                        onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                        placeholder="Nombre del archivo"
                        className="pl-10"
                    />
                </div>
            </Field>

            {/* Año */}
            <Field>
                <FieldLabel htmlFor="year" className="text-sm font-medium">Año</FieldLabel>
                <Input
                    id="year"
                    type="number"
                    value={filters.year}
                    onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value.toUpperCase() }))}
                    placeholder="YYYY"
                    min="1900"
                    max="2099"
                />
            </Field>

            {/* Tipo de Archivo */}
            <Field>
                <FieldLabel htmlFor="doc_type" className="text-sm font-medium" id="file-type-label">Tipo</FieldLabel>
                <Select value={filters.doc_type} onValueChange={(value) => setFilters(prev => ({ ...prev, doc_type: value }))}>
                    <SelectTrigger id="doc_type" className="cursor-pointer h-10" aria-labelledby="file-type-label">
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
                <FieldLabel htmlFor="user" className="text-sm font-medium" id="created-by-label">Creado por</FieldLabel>
                <Select value={filters.created_by} onValueChange={(value) => setFilters(prev => ({ ...prev, created_by: value }))}>
                    <SelectTrigger id="user" className="cursor-pointer h-10" aria-labelledby="created-by-label">
                        <SelectValue placeholder="Seleccionar usuario" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Usuarios</SelectLabel>
                            <SelectItem value="d2edb2ab-cca7-45c8-9748-a17e999b7f0f">ise</SelectItem>
                            <SelectItem value="0bab831b-3e92-4897-b641-cffc0dfe1d3f">erick</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
}
