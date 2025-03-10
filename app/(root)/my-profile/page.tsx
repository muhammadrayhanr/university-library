import { auth, signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { eq, inArray } from 'drizzle-orm';
import React from 'react';

const Page = async () => {
  const session = await auth();

  const borrowedBookRecords = await db
    .select({ bookId: borrowRecords.bookId })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id as string));

  const borrowedBookIds = borrowedBookRecords.map((record) => record.bookId);

  const borrowedBooks =
    borrowedBookIds.length > 0
      ? await db.select().from(books).where(inArray(books.id, borrowedBookIds))
      : [];

      return (
        <div className="w-full flex flex-col items-center justify-center px-4">
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
      
          {borrowedBooks.length > 0 ? (
            <BookList title="Borrowed Books" books={borrowedBooks} />
          ) : (
            <p className="text-light-100 text-xl">You haven&apos;t borrowed any books yet.</p>
          )}
        </div>
      );
      
};

export default Page;
