'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import BookCoverSvg from './BookCoverSvg';
import { IKImage } from 'imagekitio-next';
import config from '@/lib/config';

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}

interface Props {
    className : string;
    variant?: BookCoverVariant;
    coverColor: string;
    coverUrl: string;
}

const BookCover = ({
    className, variant = 'regular', coverColor = '#012B48', coverImage = 'https://placehold.co/400x600.png',
}: Props) => {
  return (
    <div className={cn('relative transition-all duration-300', variantStyles[variant], className, )}>
        <BookCoverSvg coverColor={coverColor} />
        <div className='absolute z-10 ' style={{left: '10%', width:'87.5%', height:'88%'}}>
            <IKImage alt='Book cover' path={coverImage} urlEndpoint={config.env.imagekit.urlEndpoint} fill className='rounded-sm' loading='lazy' lqip={{active: true}}/>
        </div>
    </div>
  )
}

export default BookCover