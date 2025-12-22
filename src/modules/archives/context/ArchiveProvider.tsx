import { useArchive } from "../hooks/useArchive"
import { ArchiveContext } from "./ArchiveContext"

export const ArchiveProvider = ({ children }: { children: React.ReactNode }) => {
    const archive = useArchive()

    return (
        <ArchiveContext.Provider value={archive}>
            {children}
        </ArchiveContext.Provider>
    )
}