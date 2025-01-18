import React, { ReactNode } from 'react';
import Headers from '@/components/Header';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='root-container'>
      <div className='mx-auto max-w-7xl'>
        <Headers />
        <div className='mt-20 pb-20'>{children}</div>
      </div>
    </main>
  );
};

export default layout;
