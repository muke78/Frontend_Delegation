import { useContext } from 'react';
import { ArchiveContext } from '@/modules/archives/context/ArchiveContext.tsx';

export const useArchiveContext = () => {
    const ctx = useContext(ArchiveContext);

    if (!ctx) {
        throw new Error('useArchiveContext must be used inside ArchiveProvider')
    }
    return ctx
}
