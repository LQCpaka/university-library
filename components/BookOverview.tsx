import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import BorrowBook from './BorrowBook';
import { eq, is } from 'drizzle-orm';
import { users } from '@/database/schema';
import { db } from '@/database/drizzle';
interface Props extends Book {
    userId: string;
}
const BookOverview = async ({ title, author, genre, rating, totalCopies, availableCopies, description, coverColor, coverUrl, id, userId, }: Book) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user) return null;

    const borrowingEligibility = {
        isEligible: availableCopies > 0 && user.status === 'APPROVED',
        message: availableCopies < 0 ? 'Sách hiện không có sẵn để mượn' : 'Tài khoản của bạn chưa được duyệt để mượn sách',


    }
    return (
        <section className='book-overview'>
            <div className='flex flex-1 flex-col gap-5'>
                <h1>
                    {title}
                </h1>
                <div className='book-info'>
                    <p>Bởi <span className='font-semibold text-light-200'>{author}</span></p>
                    <p>Thể Loại{" "} <span className='font-semibold text-light-200'>{genre}</span></p>
                    <div className='flex flex-row gap-1'>
                        <Image src="/icons/star.svg" alt='star' width={22} height={22} />
                        <p>{rating}</p>
                    </div>
                    <div className='book-copies'>
                        <p>Tổng Số Sách:<span>{totalCopies}</span></p>
                        <p>Số Sách Hiện Tại:<span>{availableCopies}</span></p>
                    </div>
                </div>
                <p className='book-description'>{description}</p>
                {user && (
                    <BorrowBook
                        bookId={id}
                        userId={userId}
                        borrowingEligibility={borrowingEligibility}
                    />
                )}
            </div>

            <div className='relative flex flex-1 justify-center'>
                <div className='relative'>
                    <BookCover
                        variant='wide'
                        className="z-10"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                    />
                    <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                        <BookCover
                            variant='wide'
                            className="z-10"
                            coverColor={coverColor}
                            coverImage={coverUrl}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookOverview