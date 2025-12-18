import { Layout } from '@/components/layout/Layout'
import { AppRouter } from '@/app/AppRouter'
import { useAuthContext } from '@/context/useAuthContext.ts';



export const Container = () => {

    const { isAuthenticated } = useAuthContext()
    return (
        <>
            {isAuthenticated && (
                <Layout>
                    <AppRouter />
                </Layout>
            )}
            <AppRouter />
        </>

    )
}

