import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

interface Props {
    params: Promise<{
        workflowId: string;
    }>
}

const IndividualWorkflowPage = async ({ params }: Props) => {

    await requireAuth();
    
    const { workflowId } = await params;
    
    return (
        <p>Workflow Id: {workflowId}</p>
    )
}

export default IndividualWorkflowPage