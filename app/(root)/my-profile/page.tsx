import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants';
import React from 'react'

const Page = () => {
  return (
    <>
        <form action={async ()=>{
            'use server';

            await signOut();   
        }}
        className='mb-10'
        >
            <Button>Đăng Xuất</Button>   
        </form>    
        <BookList title='Mượn Sách' books={sampleBooks}/>
    </>
  )
}

export default Page