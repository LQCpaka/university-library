'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';
interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    }
}
const BorrowBook = ({userId, bookId, borrowingEligibility: {isEligible, message}}: Props) => {
    const router = useRouter();

    const [borrowing, setBorrowing] = useState(false);

    const handleBorrowBook = async () =>{
        if(!isEligible) {
            toast({
                title: 'Lỗi',
                description: message,
                variant: 'destructive'
            })
        }

        setBorrowing(true);

        try {
            const result = await borrowBook({bookId, userId});

            if(result.success){
                toast({
                    title: 'Thành công',
                    description: 'Sách đã được mượn',
                    variant: 'success'
                })
                router.push('/my-profile')
            } else {
                toast({
                    title: 'Lỗi',
                    description: 'Có lỗi đã xảy ra trong quá trình mượn sách',
                    variant: 'destructive'
                })
            }
        } catch (error) {   
            toast({
                title: 'Lỗi',
                description: 'Có lỗi đã xảy ra trong quá trình mượn sách',
                variant: 'destructive'
            })
        } finally{
            setBorrowing(false);
        }
    };
    return (
        <Button className='book-overview_btn' onClick={handleBorrowBook} disabled={borrowing}>
            <Image src="/icons/book.svg" alt='book' height={20} width={20} />
            <p className='font-bebas-neue text-xl text-dark-100' >{borrowing? 'Đang Mượn' : 'Mượn Sách'}</p>
        </Button>
    );
};

export default BorrowBook