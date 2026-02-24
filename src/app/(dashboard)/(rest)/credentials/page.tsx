import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const CredentialPage = async () => {

    await requireAuth();

    return (
        <div>CredentialPage</div>
    )
}

export default CredentialPage