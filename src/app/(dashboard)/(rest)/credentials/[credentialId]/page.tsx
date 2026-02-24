import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

interface Props {
    params: Promise<{
        credentialId: string;
    }>
}

const IndividualCredentialPage = async ({ params }: Props) => {

    await requireAuth();
    
    const { credentialId } = await params;
    
    return (
        <p>Credential Id: {credentialId}</p>
    )
}

export default IndividualCredentialPage