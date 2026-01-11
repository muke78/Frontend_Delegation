import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PAGE_LIMIT } from "@/hooks/useEnviromentArchives.ts";
import { listArchiveDuplex } from "@/modules/archives/services/archive.services.ts";
import type {
	ArchiveBase,
	ArchiveDialogRelatedDuplex,
	ArchiveDuplex,
} from "@/modules/archives/types.ts";
import type { RelatedEntry } from "@/modules/related-entries/types";
import type { Pagination } from "@/services/api/types";
import { ErrorCollector } from "@/utils/ErrorCollector";

// Utilidades (Consguir los parametros de la URL)
const getFiltersFromURL = (): ArchiveDialogRelatedDuplex => {
	const params = new URLSearchParams(window.location.search);

	return {
		r_limit: params.get("r_limit") || String(DEFAULT_PAGE_LIMIT),
		r_page: params.get("r_page") || "1",
	};
};

// Actualizar los parametros que se mandan en la ui
const updateDuplexParamsInURL = (filters: ArchiveDialogRelatedDuplex) => {
	const params = new URLSearchParams(window.location.search);

	params.set("r_page", filters.r_page);
	params.set("r_limit", filters.r_limit);

	return params;
};

export const useArchiveDuplex = ({ open, archiveId }: ArchiveDuplex) => {
	const navigate = useNavigate();

	// Estados
	const [loading, setLoading] = useState(true);
	const [archiveView, setArchiveView] = useState<ArchiveBase | null>(null);
	const [relatedView, setRelatedView] = useState<RelatedEntry[]>([]);
	const [paginationViewDuplex, setPaginationViewDuplex] =
		useState<Pagination>();
	const [filtersDuplex, setFiltersDuplex] =
		useState<ArchiveDialogRelatedDuplex>(getFiltersFromURL);

	// Recolector de errores
	const { handleApiError } = ErrorCollector();

	// Desestructuracion de filtros especiales
	const { r_page, r_limit } = filtersDuplex;

	// Función de cambio de página
	const handlePageChange = useCallback((page: number) => {
		setFiltersDuplex((prev) => ({
			...prev,
			r_page: String(page),
		}));

		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	// Función para cambiar el límite de registros por página
	const handleLimitChange = useCallback((limit: number) => {
		setFiltersDuplex((prev) => ({
			...prev,
			r_limit: String(limit),
			r_page: "1",
		}));
	}, []);

	// Limpiador de filtros en la URL al cerrar el Dialog
	const clearDuplexParams = () => {
		const params = new URLSearchParams(window.location.search);

		params.delete("dialog");
		params.delete("archiveId");
		params.delete("r_page");
		params.delete("r_limit");

		navigate(`${window.location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	// Efectos (Conseguir la lista duplex de archivos y sus referencias)
	useEffect(() => {
		if (!open || !archiveId) return;

		const params = updateDuplexParamsInURL(filtersDuplex);

		navigate(`${window.location.pathname}?${params.toString()}`, {
			replace: true,
		});

		const getArchiveById = async () => {
			try {
				setLoading(true);
				const res = await listArchiveDuplex(archiveId, {
					page: r_page,
					limit: r_limit,
				});

				const data = res.data;

				if (!data) {
					throw new Error("Respuesta vacía del servidor");
				}

				setArchiveView(data.archive ?? null);
				setRelatedView(Array.isArray(data.related) ? data.related : []);
				setPaginationViewDuplex(data.pagination ?? undefined);
			} catch (error) {
				handleApiError(error);
			} finally {
				setLoading(false);
			}
		};
		navigate(`${window.location.pathname}?${params.toString()}`, {
			replace: true,
		});
		getArchiveById();
	}, [
		archiveId,
		filtersDuplex,
		handleApiError,
		navigate,
		open,
		r_limit,
		r_page,
	]);

	// Construccion de sincronizacion de la url (solo para modal de duplex)
	useEffect(() => {
		const params = updateDuplexParamsInURL(filtersDuplex);
		const newUrl = params.toString()
			? `${window.location.pathname}?${params.toString()}`
			: window.location.pathname;

		navigate(newUrl, { replace: true });
	}, [filtersDuplex, navigate]);

	return {
		loading,
		archiveView,
		relatedView,
		paginationViewDuplex,
		filtersDuplex,
		handlePageChange,
		handleLimitChange,
		clearDuplexParams,
	};
};
