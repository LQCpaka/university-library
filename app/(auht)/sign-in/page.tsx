"use client"

import AuthForm from '@/components/AuthForm'
import { signInnSchema } from '@/lib/validations'
import React from 'react'

const Page = () => (
    <AuthForm 
        type='SIGN_IN'
        schema={signInnSchema} 
        defaultValues={{
            email: "",
            password: "",
        }}
        onSubmit={()=>{}}    
    />
)

export default Page