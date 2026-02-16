import { useEffect, useState } from "react";
import type { RelatedActionsType, RelatedFormState } from "../types";
import { DEFAULT_FORM_STATE_RELATED } from "@/hooks/useEnviromentArchives";
import { useCalendar } from "@/hooks/useCalendar";
import { ErrorCollector } from "@/utils/ErrorCollector";
import {
	listRelatedSpecify,
	updateRelated,
} from "../services/related.services";
import { toast } from "sonner";
import { useRelatedContext } from "../context/useRelatedContext";

export const useRelatedEdit = ({open, archiveId, relatedId, onClose}: RelatedActionsType) => {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [selectedArchiveId, setSelectedArchiveId] = useState(archiveId);
	const { refreshRelated } = useRelatedContext();

	const [formEdit, setFormEdit] = useState<RelatedFormState>(
		DEFAULT_FORM_STATE_RELATED,
	);

	const { month, selectedDate, setMonth } = useCalendar(formEdit.event_date);

	// Recolector de errores
	const { handleApiError } = ErrorCollector();

	// Funcion que manda a editar un archivo
	const handleSubmitEdit = async () => {
		try {
			const payload = {
				description: formEdit.description,
				event_date: formEdit.event_date,
				responsible_person: formEdit.responsible_person,
				responsible_role: formEdit.responsible_role,
				notas: formEdit.notas,
			};

			const res = await updateRelated(selectedArchiveId, relatedId, payload);
			await refreshRelated();
			toast.success(res.message);
			onClose();
		} catch (error) {
			handleApiError(error);
		}
	};

	// Efectos (Conseguir el registro que se le dio clic y sobnecargarlo al Dialog para editar)
	useEffect(() => {
		if (!open || !archiveId) return;

		if (open && archiveId) {
			setSelectedArchiveId(archiveId);
		}

		const getArchiveById = async () => {
			try {
				const res = await listRelatedSpecify(archiveId, relatedId);
				const related = res.data[0];

				if (related) {
					setFormEdit({
						description: related.description ?? "",
						event_date: related.event_date.split("T")[0] ?? "",
						responsible_person: related.responsible_person ?? "",
						responsible_role: related.responsible_role ?? "",
						notas: related.notas ?? "",
					});
				} else {
					toast.error(`No se encontró el archivo con ID ${archiveId}`);
					onClose();
				}
			} catch (error) {
				handleApiError(error);
			}
		};

		getArchiveById();
	}, [archiveId, onClose, open, handleApiError, relatedId]);

	useEffect(() => {
		if (selectedDate) {
			setMonth(selectedDate);
		}
	}, [selectedDate, setMonth]);

	return {
		selectedArchiveId,
		formEdit,
		openCalendar,
		selectedDate,
		month,
		setMonth,
		setOpenCalendar,
		setFormEdit,
		setSelectedArchiveId,
		handleSubmitEdit,
	};
};
