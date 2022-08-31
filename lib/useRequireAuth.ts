import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from '../node_modules/next/router';


function useRequireAuth() {
    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!session && typeof session != "undefined") {
            router.push("/login");
        }
    }, [session, router]);

    return session;
}

export default useRequireAuth;