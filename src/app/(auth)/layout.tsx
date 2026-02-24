import { Layout } from '@/features/auth/components/auth-layout'
import React from 'react'

const AuthLayout = ({ children }:{ children: React.ReactNode }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default AuthLayout