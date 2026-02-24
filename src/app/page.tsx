import { LogoutButton } from '@/features/auth/components/logout';
import { requireAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server';
import React from 'react'

const Home = async () => {

    await requireAuth();

    const data = await caller.getUsers();

    return (
        <div className='min-h-screen min-w-screen flex justify-center items-center flex-col gap-y-6'>
            Protected Server Component
            <div>
                {JSON.stringify(data,null,2)}
            </div>
            <LogoutButton/>
        </div>
    )
}

export default Home