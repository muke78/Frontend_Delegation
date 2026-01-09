import { useRelated } from "@/modules/related-entries/hooks/useRelated.ts";
import { RelatedContext } from "@/modules/related-entries/context/RelatedContext.tsx";

export const RelatedProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const related = useRelated();

	return (
		<RelatedContext.Provider value={related}>
			{children}
		</RelatedContext.Provider>
	);
};
