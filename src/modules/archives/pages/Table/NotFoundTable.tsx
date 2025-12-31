import { TableCell } from "@/components/ui/table"
import { Icons } from "@/styles/Icons"

type Props = {
    subtitle: string,
    description: string
    spaceColSpan: number
}

export const NotFoundTable = ({ subtitle, description, spaceColSpan }: Props) => {
    return (
        <TableCell
            colSpan={spaceColSpan}
            className="h-32 text-center text-muted-foreground"
        >
            <div className="flex flex-col items-center justify-center gap-3">
                <Icons.FileText className="h-12 w-12 text-muted-foreground/40" />
                <div>
                    <p className="font-medium">{subtitle}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                </div>
            </div>
        </TableCell>
    )
}
