import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar/AppSidebar';
import { useState } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [defaultOpen] = useState<boolean>(() => {
        const stored = localStorage.getItem("sidebar_state")
        return stored === null ? true : stored === "true"
    })

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
