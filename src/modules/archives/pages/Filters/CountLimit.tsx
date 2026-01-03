import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import type { Pagination } from "@/services/api/types";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type CountLimitProps = {
	pagination?: Pagination;
	limit: string;
	onLimitChange: (limit: number) => void;
};

const LIMIT_OPTIONS = [5, 10, 20, 50, 100];

export const CountLimit = ({
	pagination,
	limit,
	onLimitChange,
}: CountLimitProps) => {
	const isDisabled =
		pagination?.totalPages === 0 || pagination?.totalPages === undefined;
	const totalRecords = pagination?.totalRecords ?? 0;

	return (
		<div className="flex justify-end items-center gap-2 h-6 mr-2">
			{/* Total de registros */}
			<div className="flex gap-2 text-sm text-muted-foreground">
				<span id="total-records-label"> Total de registros: </span>
				<Badge variant={"default"} aria-labelledby="total-records-label">
					{totalRecords}
				</Badge>
			</div>

			<Separator orientation="vertical" />

			{/* Selector de límite */}
			<div className="flex justify-end items-center gap-2">
				<label htmlFor="page-limit" className="text-sm text-muted-foreground">
					Mostrar:
				</label>
				<Tooltip open={isDisabled ? undefined : false}>
					<TooltipTrigger asChild>
						<div>
							<Select
								value={String(limit)}
								onValueChange={(value) => onLimitChange(Number(value))}
								disabled={isDisabled}
							>
								<SelectTrigger
									id="page-limit"
									className="w-24"
									aria-label="Seleccionar cantidad de registros a mostrar"
									aria-disabled={isDisabled}
								>
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									{LIMIT_OPTIONS.map((option) => (
										<SelectItem key={option} value={String(option)}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</TooltipTrigger>

					{isDisabled && (
						<TooltipContent>
							<span>No hay registros disponibles para mostrar.</span>
						</TooltipContent>
					)}
				</Tooltip>

				<span className="text-sm text-muted-foreground">registros</span>
			</div>
		</div>
	);
};
