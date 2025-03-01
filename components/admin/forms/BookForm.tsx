"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import FileUpload from '@/components/FileUpload'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validations'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ColorPicker from '../ColorPicker'
import { createBook } from '@/lib/admin/actions/book'

interface Props extends Partial<Book> {
    type?: 'create' | 'update';
}


const BookForm = ({ type, ...book}: Props) => {
    const router = useRouter();


    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);
         if(result.success){
            toast({
                title: 'Thành Công',
                description: 'Sách đã được thêm vào thư viện',
            });
            router.push(`/admin/books/${result.data.id}`);
         } else {
            toast({
                title: 'Thất Bại',
                description: result.message,
                variant: 'destructive',
            })
         }
        // console.log(value);
    };  
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Tựa Đề Sách
                            </FormLabel>
                            <FormControl>

                                <Input
                                    required
                                    placeholder='Nhập tựa đề sách'
                                    {...field}
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"author"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Tác Giả
                            </FormLabel>
                            <FormControl>

                                <Input
                                    required
                                    placeholder='Tác Giả Sách'
                                    {...field}
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"genre"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Thể Loại
                            </FormLabel>
                            <FormControl>

                                <Input
                                    required
                                    placeholder='Thể Loại Sách'
                                    {...field}
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"rating"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Đánh Giá
                            </FormLabel>
                            <FormControl>

                                <Input
                                    type='number'
                                    min={1}
                                    max={5}
                                    placeholder='Đánh Giá'
                                    {...field}
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"totalCopies"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Tổng Số Lượng Sách
                            </FormLabel>
                            <FormControl>

                                <Input
                                    type='number'
                                    min={1}
                                    max={10000}
                                    placeholder='Tổng số sách'
                                    {...field}
                                    className='book-form_input'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverUrl"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Ảnh Bìa
                            </FormLabel>
                            <FormControl>
                                <FileUpload type='image' accept='image/*' placeholder='Tải ảnh bìa sách' folder='books/covers' variant='light' onFileChange={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverColor"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Màu Bìa
                            </FormLabel>
                            <FormControl>
                                <ColorPicker onPickerChange={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Mô Tả
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Mô tả sách'
                                    {...field}
                                    rows={10}
                                    className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"videoUrl"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Trailer Sách
                            </FormLabel>
                            <FormControl>
                            <FileUpload type='video' accept='video/*' placeholder='Tải video trailer' folder='books/videos' variant='light' onFileChange={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"summary"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500' >
                                Tóm tắt Sách
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Mô tả sách'
                                    {...field}
                                    rows={5}
                                    className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button typeof='submit' className='book-form_btn text-white'>
                    Thêm Sách Vào Thư Viện
                </Button>
            </form>
        </Form>
    );
};

export default BookForm