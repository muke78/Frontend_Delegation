// biome-ignore assist/source/organizeImports: <>
import { useRelatedContext } from "@/modules/related-entries/context/useRelatedContext.ts";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";

export const useArchiveActions = () => {
	const { refreshArchive } = useArchiveContext();
	const { refreshRelated } = useRelatedContext();

	const syncAfterArchiveDelete = async () => {
		await refreshArchive();
		await refreshRelated();
	};

	return { syncAfterArchiveDelete };
};
