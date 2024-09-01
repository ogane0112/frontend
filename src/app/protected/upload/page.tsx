'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const UploadForm = dynamic(() => import('@/components/upload/UploadForm'), { ssr: false })

export default function Component() {
  type Data = {
    title: string
    manimCode: string
    tags: string[]
    videoFile: File | null
    manimFile: File | null
    description: string
    algorithmExplanation: string
    activeTab: string
    references: string[]
  }
  
  const [data, setData] = useState<Data>({
    title: '',
    manimCode: '',
    tags: [],
    videoFile: null,
    manimFile: null,
    description: '',
    algorithmExplanation: '',
    activeTab: 'code',
    references: [],
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFormChange = (data: Partial<Data>) => {
    setData((prevData) => {
      const newData = { ...prevData, ...data }
      if (newData.videoFile && newData.videoFile !== prevData.videoFile) {
        // 新しい動画ファイルが選択された場合、プレビューURLを更新
        setPreviewUrl(URL.createObjectURL(newData.videoFile))
      }
      return newData
    })
  }

  useEffect(() => {
    // コンポーネントのクリーンアップ時にオブジェクトURLを解放
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <UploadForm onChange={handleFormChange} />
      </div>
    </div>
  )
}
