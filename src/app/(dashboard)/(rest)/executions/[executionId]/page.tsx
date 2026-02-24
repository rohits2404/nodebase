import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

interface Props {
    params: Promise<{
        executionId: string;
    }>
}

const IndividualExecutionPage = async ({ params }: Props) => {

    await requireAuth();
    
    const { executionId } = await params;
    
    return (
        <p>Execution Id: {executionId}</p>
    )
}

export default IndividualExecutionPage