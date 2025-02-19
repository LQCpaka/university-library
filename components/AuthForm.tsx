"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import React from 'react'
import { ZodType } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ sucess: boolean, error?: string }>;
    type: 'SIGN_IN' | 'SIGN_UP';
}
const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
    const isSignIn = type === "SIGN_IN";

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    })

    const handleSubmit: SubmitHandler<T> = async (data) => { };
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-white'>
                {isSignIn ? "Chào mừng trở lại!" : "Tạo tài khoản để sử dụng"}
            </h1>
            <p className='text-light-100 '>
                {isSignIn ? 'Truy cập vào bộ sưu tập tài nguyên khổng lồ và luôn cập nhật' :
                    'Vui lòng hoàn thành tất cả các trường và cập nhật thẻ đại học hợp lệ để có quyền truy cập vào thư viện'}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='captitalize' >{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                    <FormControl>
                                    {field.name === 'universityCard'  ? <ImageUpload onFileChange={field.onChange} /> : (
                                        <Input required type={
                                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                                        } {...field} 
                                        className='form-input'
                                        />
                                    )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))} 
                    <Button className='form-btn' type="submit">{isSignIn ? 'Đăng nhập' : 'Đăng ký'}</Button>
                </form>
            </Form>
            <p className='text-center text-base font-[400]'>
                {isSignIn ? 'Là người mới đến với BookWise? ' : 'Đã có tài khoản? '}
                <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-primary'>
                    {isSignIn ? 'Đăng ký' : 'Đăng nhập'}
                </Link>
            </p>
        </div>

    )
}

export default AuthForm