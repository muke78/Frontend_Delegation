import { useCallback, useEffect, useRef, useState } from "react";
import type {
	ArchiveBase,
	ArchiveFilters,
	ColumnVisibility,
	FormState,
	UUID,
} from "@/modules/archives/types.ts";
import {
	listArchives,
	deleteArchive,
	rebuildFolio,
	createArchive,
} from "@/modules/archives/services/archive.services.ts";
import type { ApiError, Pagination } from "@/services/api/types.ts";
import { useAuthContext } from "@/context/useAuthContext.ts";
import { useNavigate } from "react-router-dom";
import {
	STORAGE_KEY,
	DEBOUNCE_DELAY,
	DEFAULT_PAGE_LIMIT,
	DEFAULT_COLUMN_VISIBILITY,
	DEFAULT_FORM_STATE,
} from "@/modules/archives/hooks/useEnviromentArchives.ts";
import { ErrorCollector } from "@/utils/archives/ErrorCollector.ts";
import { toast } from "sonner";

// Utilidades (Conseguir la visibilidad de columnas)
const getStoredColumnVisibility = (): ColumnVisibility => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : DEFAULT_COLUMN_VISIBILITY;
	} catch (error) {
		console.error("Error al parsear la visibilidad de las columnas:", error);
		return DEFAULT_COLUMN_VISIBILITY;
	}
};

// Construccion de parametros que se disponen
const getFiltersFromURL = (): ArchiveFilters => {
	const params = new URLSearchParams(window.location.search);

	return {
		identifier: params.get("identifier") || "",
		base_folio: params.get("base_folio") || "",
		name: params.get("name") || "",
		doc_type: params.get("doc_type") || "",
		year: params.get("year") || "",
		created_by: params.get("created_by") || "",
		limit: params.get("limit") || String(DEFAULT_PAGE_LIMIT),
		page: params.get("page") || "",
	};
};

export const useArchive = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const debounceTimeoutRef = useRef<number | null>(null);

	// Estado
	const [archive, setArchive] = useState<ArchiveBase[]>([]);
	const [paginationArchive, setPaginationArchive] = useState<Pagination>();
	const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(
		getStoredColumnVisibility,
	);
	const [filters, setFilters] = useState<ArchiveFilters>(getFiltersFromURL);
	const [formCreate, setFormCreate] = useState<FormState>(DEFAULT_FORM_STATE);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(true);

	const { handleApiError } = ErrorCollector();

	// Funciones de columnas
	const toggleColumn = useCallback((column: keyof ColumnVisibility) => {
		setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
	}, []);

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

	// Funciones de API
	const loadListArchive = useCallback(
		async (queryParams?: ArchiveFilters) => {
			try {
				setLoading(true);
				const res = await listArchives(queryParams);

				if (res.data && "rows" in res.data) {
					setArchive(res.data.rows);
					setPaginationArchive(res.data.pagination);
				} else {
					setArchive([]);
				}
			} catch (error) {
				handleApiError(error);
				setArchive([]);
				setPaginationArchive(undefined);
			} finally {
				setLoading(false);
			}
		},
		[handleApiError],
	);

	// Funcion que refresca la data si hay cambios
	const refresh = useCallback(async () => {
		await loadListArchive(filters);
	}, [filters, loadListArchive]);

	// Funcion que manda a crear archivos
	const handleSubmitCreate = useCallback(async (): Promise<void> => {
		try {
			const res = await createArchive({
				...formCreate,
				created_by: user?.user_id,
			});

			await refresh();
			toast.success(res.message);
			setOpenDialog(false);
			setFormCreate(DEFAULT_FORM_STATE);
		} catch (error) {
			handleApiError(error);
		}
	}, [formCreate, user?.user_id, refresh, handleApiError]);

	// Funcion que manda a borrar archivos
	const handleDeleteArchive = useCallback(
		async (archiveId: UUID): Promise<boolean> => {
			try {
				const res = await deleteArchive(archiveId);
				toast.success(res.message);
				setArchive((prev) => prev.filter((a) => a.archives_id !== archiveId));
				await loadListArchive();
				return true;
			} catch (error) {
				handleApiError(error);
				await refresh();
				return false;
			}
		},
		[handleApiError, refresh, loadListArchive],
	);

	// Funcion que manda a reconstruir el folio
	const handleRebuildFolio = useCallback(
		async (archiveId: UUID): Promise<boolean> => {
			try {
				const res = await rebuildFolio(archiveId);
				toast.success(res.message);
				await refresh();
				return true;
			} catch (error) {
				const err = error as ApiError;

				if (err.type === "validation") {
					err.errors.forEach((msg) => toast.info(msg.message));
				} else {
					toast.info(err.message);
				}

				return false;
			}
		},
		[refresh],
	);

	// Efectos (Debounce para carga lenta en filtros)
	useEffect(() => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		debounceTimeoutRef.current = setTimeout(() => {
			loadListArchive(filters);
		}, DEBOUNCE_DELAY);

		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, [filters, loadListArchive]);

	// Construccion de sincronizacion de la url (solo para archivos)
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
		localStorage.setItem(STORAGE_KEY, JSON.stringify(columnVisibility));
	}, [columnVisibility]);

	return {
		archive,
		loading,
		paginationArchive,
		columnVisibility,
		openDialog,
		formCreate,
		filters,
		setOpenDialog,
		setFormCreate,
		setFilters,
		toggleColumn,
		loadListArchive,
		refresh,
		handleSubmitCreate,
		handleRebuildFolio,
		handleDeleteArchive,
		handlePageChange,
		handleLimitChange,
	};
};
