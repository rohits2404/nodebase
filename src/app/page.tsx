"use client"

import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/features/auth/components/logout';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import React from 'react'

const Home = () => {

    const trpc = useTRPC();

    const queryClient = useQueryClient();

    const { data } = useQuery(trpc.getWorkflows.queryOptions());

    const testAI = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success("AI Job Queued");
        }
    }));

    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: () => {
            toast.success("Workflow Created");
        }
    }));

    return (
        <div className='min-h-screen min-w-screen flex justify-center items-center flex-col gap-y-6'>
            Protected Server Component
            <div>
                {JSON.stringify(data,null,2)}
            </div>
            <Button onClick={() => create.mutate()} disabled={create.isPending}>
                Create Workflow
            </Button>
            <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
                Test AI
            </Button>
            <LogoutButton/>
        </div>
    )
}

export default Home