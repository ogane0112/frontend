'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const UploadForm = dynamic(() => import('@/components/upload/UploadForm'), { ssr: false })

export default function Component() {
  const [Data, setData] = useState({
    title: '',
    manimCode: '',
    tags: [] as string[],
    videoFile: null as File | null,
    manimFile: null as File | null,
    description: '',
    algorithmExplanation: '',
    activeTab: 'code',
    references: [] as string[], // 参考文献の配列を追加
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFormChange = (data: Partial<typeof Data>) => {
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
