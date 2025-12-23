import { Icons } from "@/styles/Icons"
import { Button } from "@/components/ui/button"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useArchiveContext } from "../../context/useArchiveContext"

export const ColumnsApp = () => {

    const { toggleColumn, columnVisibility } = useArchiveContext()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 cursor-pointer">
                    <Icons.Settings2 className="h-4 w-4" />
                    Columnas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.id}
                    onCheckedChange={() => toggleColumn('id')}
                >
                    ID
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.identifier}
                    onCheckedChange={() => toggleColumn('identifier')}
                >
                    Identificador
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.base}
                    onCheckedChange={() => toggleColumn('base')}
                >
                    Base
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.folio}
                    onCheckedChange={() => toggleColumn('folio')}
                >
                    Folio
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.name}
                    onCheckedChange={() => toggleColumn('name')}
                >
                    Nombre
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.type}
                    onCheckedChange={() => toggleColumn('type')}
                >
                    Tipo
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.year}
                    onCheckedChange={() => toggleColumn('year')}
                >
                    Año
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.path}
                    onCheckedChange={() => toggleColumn('path')}
                >
                    Ruta
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.sheet}
                    onCheckedChange={() => toggleColumn('sheet')}
                >
                    Hoja
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={columnVisibility.creator}
                    onCheckedChange={() => toggleColumn('creator')}
                >
                    Creado por
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
