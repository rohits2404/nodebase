import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Layout = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
            <div className='flex w-full max-w-sm flex-col gap-6'>
                <Link href={"/"} className='flex items-center gap-2 self-center font-medium'>
                    <Image alt='Logo' src={"/images/logo.svg"} width={70} height={70} />
                    Nodebase
                </Link>
                {children}
            </div>
        </div>
    )
}