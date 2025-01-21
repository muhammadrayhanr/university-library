import React, { ReactNode } from 'react';
import Headers from '@/components/Header';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect('/sign-in');

  return (
    <main className='root-container'>
      <div className='mx-auto max-w-7xl'>
        <Headers session={session} />
        <div className='mt-20 pb-20'>{children}</div>
      </div>
    </main>
  );
};

export default layout;
