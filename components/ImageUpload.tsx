'use client'

import config from '@/lib/config';
import {IKImage, ImageKitProvider, IKUpload, ImageKitContext} from 'imagekitio-next'

import React, { useRef, useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { Description } from '@radix-ui/react-toast';
import { toast } from '@/hooks/use-toast';

const { env: {imagekit : {publicKey, urlEndpoint}} } = config;


const authenticator = async () =>{
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request fail with status: ${response.status} : ${errorText}`);
    };
    const data  = await response.json();
    const { signature, expire, token } = data;
    
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Error authenticating: ${error.message}` )
  }
}

const ImageUpload = ({onFileChange, } : {onFileChange : (filePath: string) => void}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{filePath: string} | null>(null);

  // Handle upload status
  const onError = (error: any) => {
    console.log(error);

    toast({
      title: "Ảnh tải lên thất bại",
      description: `Ảnh của bạn đã tải lên thất bại! Vui lòng thử lại.`,
      variant: 'destructive'
    })
  }
  const onSuccess = (res: any) => {

    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Ảnh đã được tải lên",
      description: `${res.filePath} đã tải lên thành công!`,
    })
  }
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload className='hidden' ref={ikUploadRef} onError={onError} onSuccess={onSuccess} fileName='test-upload.png' />

      <Button className='upload-btn bg-[#232839] hover:bg-[#434c5c]' onClick={(e)=>{
        e.preventDefault();
        if(ikUploadRef.current){
          //ts-ignore
          ikUploadRef.current?.click();
        }
      }}>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className='object-contain' />
        <p className='text-base text-light-100'>Đăng tải một file</p>
        {file && <p className='upload-filename'>{file.filePath}</p>}
      </Button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload