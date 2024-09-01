'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const UploadForm = dynamic(() => import('@/components/upload/UploadForm'), { ssr: false })

export default function Component() {
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFormChange = () => {
    setPreviewUrl("")
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <UploadForm onChange={handleFormChange} />
      </div>
    </div>
  )
}
