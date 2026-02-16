import { ArchiveContext } from "@/modules/archives/context/ArchiveContext.tsx";
import { useArchive } from "@/modules/archives/hooks/useArchive.ts";

export const ArchiveProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const archive = useArchive();

	return (
		<ArchiveContext.Provider value={archive}>
			{children}
		</ArchiveContext.Provider>
	);
};
