import { Client } from '@/modules/client';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

const Home = async () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

    return (
        <div className='min-h-screen min-w-screen flex items-center justify-center'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Client />
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default Home