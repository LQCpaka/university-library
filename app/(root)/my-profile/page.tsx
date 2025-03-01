import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants';
import React from 'react'

const Page = () => {
  return (
    <>
         
        <BookList title='Mượn Sách' books={sampleBooks}/>
    </>
  )
}

export default Page