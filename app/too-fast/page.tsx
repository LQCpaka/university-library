import React from 'react'

const Page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
        <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>
            Chill due ! Sao mà nhanh thế ? slow down !
        </h1>
        <p className='mt-5 max-w-xl text-center text-light-400'>
            Có vẻ như bạn đã truy cập quá nhanh nên bạn sẽ bị giới hạn trong một khoảng thời gian ngắn.
        </p>
    </main>
  )
}

export default Page