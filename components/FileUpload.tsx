'use client'

import config from '@/lib/config';
import { IKImage, ImageKitProvider, IKUpload, ImageKitContext, IKVideo } from 'imagekitio-next'
import React, { useRef, useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { set } from 'zod';
import { cn } from '@/lib/utils';

const { env: { imagekit: { publicKey, urlEndpoint } } } = config;


const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request fail with status: ${response.status} : ${errorText}`);
    };
    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Error authenticating: ${error.message}`)
  }
}

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({ type, accept, placeholder, folder, variant, onFileChange, value }: Props) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300 hover:bg-[#434c5c]' : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  }
  // Handle upload status
  const onError = (error: any) => {
    console.log(error);

    toast({
      title: `${type} tải lên thất bại`,
      description: `${type} của bạn đã tải lên thất bại! Vui lòng thử lại.`,
      variant: 'destructive'
    })
  }

  const onSuccess = (res: any) => {

    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} đã được tải lên`,
      description: `${res.filePath} đã tải lên thành công!`,
    })
  }
  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File quá lớn',
          description: 'Vui lòng chọn file có kích thước nhỏ hơn 20MB',
          variant: 'destructive',
        });
        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File quá lớn',
          description: 'Vui lòng chọn file có kích thước nhỏ hơn 50MB',
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  }
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <Button className={cn("upload-btn ", styles.button)} onClick={(e) => {
        // bg-[#232839] hover:bg-[#434c5c]
        e.preventDefault();
        if (ikUploadRef.current) {
          //ts-ignore
          ikUploadRef.current?.click();
        }
      }}>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className='object-contain' />
        <p className={cn("text-base text-light-100", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </Button>

      {progress > 0 && progress !== 100 &&(
        <div className='w-full rounded bg-green-100'>
          <div className='progress' style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file &&
        (type === 'image' ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) :  type ===  'video' ? (
          <IKVideo
           path={file.filePath}
           controls={true}
           className='h-96 w-full rounded-xl'
          />
        ): null )}
    </ImageKitProvider>
  )
}

export default FileUpload