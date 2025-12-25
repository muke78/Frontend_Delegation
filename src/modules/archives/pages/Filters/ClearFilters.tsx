import { Button } from "@/components/ui/button"
import { Icons } from "@/styles/Icons"
import { useArchiveContext } from "../../context/useArchiveContext"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export const ClearFilters = () => {
    const { setFilters } = useArchiveContext()

    const clearFilters = () => {
        setFilters({
            identifier: "",
            base_folio: "",
            name: "",
            doc_type: "",
            year: "",
            created_by: "",
        })
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <Button
                    variant={"secondary"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() => clearFilters()}
                >
                    <Icons.Eraser />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left" align="center">
                <p>Limpiar filtros</p>
            </TooltipContent>
        </Tooltip>

    )
}
