import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts"
import { Separator } from "@/components/ui/separator";

export const CountLimit = () => {
    const { handleLimitChange, filters, paginationArchive } = useArchiveContext()
    return (
        <div className="flex justify-end items-center gap-2 h-6">
            <div className="flex gap-2 text-sm text-muted-foreground">
                <span> Total de registros: </span>
                <Badge variant={"default"}>
                    {paginationArchive?.totalRecords}
                </Badge>

            </div>
            <Separator orientation="vertical"/>
            <div className="flex justify-end items-center gap-2">
                <span className="text-sm text-muted-foreground">Mostrar:</span>
                <Select
                    value={filters.limit || "20"}
                    onValueChange={(value) => handleLimitChange(Number(value))}
                >
                    <SelectTrigger className="w-25">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent aria-label="Mostrar limite de registros" >
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">registros</span>
            </div>
        </div>
    )
}
