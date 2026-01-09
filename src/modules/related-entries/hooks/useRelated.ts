import { useCallback, useEffect, useRef, useState } from "react";
import type {
	RelatedEntry,
	ColumnVisibilityRelated,
	CreateRelatedPayload,
	RelatedQueryParams,
} from "@/modules/related-entries/types.ts";
import type { Pagination } from "@/services/api/types";
import {
	DEBOUNCE_DELAY,
	DEFAULT_PAGE_LIMIT,
	DEFAULT_COLUMN_VISIBILITY_RELATED,
	STORAGE_KEY_RELATED,
	DEFAULT_FORM_STATE_RELATED,
} from "@/hooks/useEnviromentArchives.ts";
import { ErrorCollector } from "@/utils/ErrorCollector";
import { createRelated, listRelated } from "@/modules/related-entries/services/related.services.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Utilidades (Conseguir la visibilidad de columnas)
const getStoredColumnVisibility = (): ColumnVisibilityRelated => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY_RELATED);
		return stored ? JSON.parse(stored) : DEFAULT_COLUMN_VISIBILITY_RELATED;
	} catch (error) {
		console.error("Error al parsear la visibilidad de las columnas:", error);
		return DEFAULT_COLUMN_VISIBILITY_RELATED;
	}
};

// Construccion de parametros que se disponen
const getFiltersFromURL = (): RelatedQueryParams => {
	const params = new URLSearchParams(window.location.search);

	return {
		reference_folio: params.get("reference_folio") || "",
		description: params.get("description") || "",
		event_date: params.get("event_date") || "",
		responsible_person: params.get("responsible_person") || "",
		limit: params.get("limit") || String(DEFAULT_PAGE_LIMIT),
		page: params.get("page") || "",
	};
};

export const useRelated = () => {
	const navigate = useNavigate();
	const debounceTimeoutRef = useRef<number | null>(null);

	// Estados
	const [related, setRelated] = useState<RelatedEntry[]>([]);
	const [paginationRelated, setPaginationRelated] = useState<Pagination>();
	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityRelated>(getStoredColumnVisibility);
	const [filters, setFilters] = useState<RelatedQueryParams>(getFiltersFromURL);
	const [formCreate, setFormCreate] = useState<CreateRelatedPayload>(
		DEFAULT_FORM_STATE_RELATED,
	);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(true);

	const { handleApiError } = ErrorCollector();

	// Funciones de columnas
	const toggleColumn = useCallback((column: keyof ColumnVisibilityRelated) => {
		setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
	}, []);

	// Mostrar todas las columnas o desaparecer todas
	const setAllColumns = (value: boolean) => {
		setColumnVisibility(
			(prev) =>
				Object.fromEntries(
					Object.keys(prev).map((key) => [key, value]),
				) as typeof prev,
		);
	};

	// Función de cambio de página
	const handlePageChange = useCallback((page: number) => {
		setFilters((prev) => ({
			...prev,
			page: String(page),
		}));

		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	// Función para cambiar el límite de registros por página
	const handleLimitChange = useCallback((limit: number) => {
		setFilters((prev) => ({
			...prev,
			limit: String(limit),
			page: "1",
		}));
	}, []);

	// Saber si hay filtros activados
	const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
		const isControlKey = key === "page" || key === "limit";
		return !isControlKey && value !== "";
	});

	// Limpieza de filtros
	const clearFilters = () => {
		if (!hasActiveFilters) return;
		setFilters((prev) => ({
			...prev,
			reference_folio: "",
			description: "",
			event_date: "",
			responsible_person: "",
			page: "1",
		}));
	};

	// Funciones de API
	const loadListRelated = useCallback(
		async (queryParams?: RelatedQueryParams) => {
			try {
				setLoading(true);
				const res = await listRelated(queryParams);

				if (res.data && "rows" in res.data) {
					setRelated(res.data.rows);
					setPaginationRelated(res.data.pagination);
				} else {
					setRelated([]);
				}
			} catch (error) {
				handleApiError(error);
				setRelated([]);
				setPaginationRelated(undefined);
			} finally {
				setLoading(false);
			}
		},
		[handleApiError],
	);

	// Funcion que refresca la data si hay cambios
	const refresh = useCallback(async () => {
		await loadListRelated(filters);
	}, [filters, loadListRelated]);

	// Funcion que manda a crear relaciones
	const handleSubmitCreate = useCallback(async (): Promise<void> => {
		try {
			const res = await createRelated(formCreate.archive_id, {
				...formCreate
			})
			await refresh();
			toast.success(res.message);
			setOpenDialog(false);
			setFormCreate(DEFAULT_FORM_STATE_RELATED);
		} catch (error) {
			handleApiError(error);
		}
	},
		[formCreate, handleApiError, refresh],
	)

	// Efectos (Debounce para carga lenta en filtros)
	useEffect(() => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		debounceTimeoutRef.current = setTimeout(() => {
			loadListRelated(filters);
		}, DEBOUNCE_DELAY);

		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, [filters, loadListRelated]);

	// Construccion de sincronizacion de la url para las entradas relacionadas
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		Object.entries(filters).forEach(([key, value]) => {
			if (value) {
				params.set(key, String(value));
			} else {
				params.delete(key);
			}
		});

		navigate(`${window.location.pathname}?${params.toString()}`, {
			replace: true,
		});
	}, [filters, navigate]);

	// Sincronizacion de visibilidad de columnas
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY_RELATED, JSON.stringify(columnVisibility));
	}, [columnVisibility]);

	return {
		related,
		loading,
		paginationRelated,
		columnVisibility,
		openDialog,
		formCreate,
		filters,
		hasActiveFilters,
		setOpenDialog,
		setFormCreate,
		setFilters,
		toggleColumn,
		setAllColumns,
		loadListRelated,
		refresh,
		handleSubmitCreate,
		handlePageChange,
		handleLimitChange,
		clearFilters,
	};
};
