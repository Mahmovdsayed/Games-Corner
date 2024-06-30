// authMiddleware.tsx
'use client'

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import React, { ReactNode } from 'react';

interface AuthMiddlewareProps {
    allowedWithoutToken?: boolean;
    children: ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children}) => {
    const router = useRouter();
    const token = useSelector((state: any) => state.token);

    if (token) {
        router.push('/');
        return null;
    }

    return <>{children}</>;
};

export default AuthMiddleware;