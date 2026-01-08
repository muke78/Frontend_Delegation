import { useContext } from "react";
import { RelatedContext } from "@/modules/related-entries/context/RelatedContext.tsx";

export const useRelatedContext = () => {
	const ctx = useContext(RelatedContext);

	if (!ctx) {
		throw new Error("useRelatedContext must be used inside RelatedProvider");
	}
	return ctx;
};
