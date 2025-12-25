import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArchiveContext } from "../../context/useArchiveContext";

export const CountLimit = () => {
    const { handleLimitChange, filters } = useArchiveContext()
    return (
        <div className="flex justify-end items-center gap-2">
            <span className="text-sm text-muted-foreground">Mostrar:</span>
            <Select
                value={filters.limit || "20"}
                onValueChange={(value) => handleLimitChange(Number(value))}
            >
                <SelectTrigger className="w-[100px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">registros</span>
        </div>
    )
}
