'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { VideoItem } from '@/components/SearchVideos'
import { searchVideos } from './actions'
import { Input } from '@/components/form/input'
import { SubmitButton } from '@/components/form/submit-button'
interface VideoData {
  id: number
  title: string
  description: string
  video_url: string
  thumbnail: string
  views: string
  postedAgo: string
  channelName: string
  channelAvatar: string
  tags: string[]
  likes_count: number
}
export default function SearchResults() {
  const router = useRouter()
  const [videoData, setVideoData] = useState<VideoData[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('query')

    const fetchResults = async () => {
      if (query) {
        try {
          // FormDataオブジェクトを作成し、クエリを追加
          const formData = new FormData()
          formData.append('query', query)

          // searchVideos関数にformDataを渡す
          const results = await searchVideos(formData)
          setVideoData(results)
        } catch (error) {
          console.error('検索中にエラーが発生しました:', error)
          // エラー処理をここに追加できます
        }
      } else {
        // クエリがない場合は、検索結果をクリアする
        setVideoData([])
      }
    }

    fetchResults()
  }, [searchParams])

  const handleSearch = async (formData: FormData) => {
    const results = await searchVideos(formData)
    setVideoData(results)
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <nav className='p-4 bg-gray-800'>
        <div className='container mx-auto flex items-center justify-between'>
          <Link
            href='/'
            className='inline-flex items-center py-2 px-4 rounded-md no-underline text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors text-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
            >
              <polyline points='15 18 9 12 15 6' />
            </svg>{' '}
            戻る
          </Link>
          <form action={handleSearch} className='flex-1 flex items-center max-w-3xl mx-4'>
            <Input
              id='query'
              name='query'
              type='text'
              placeholder='検索キーワードを入力'
              required
              className='flex-1 px-4 py-2 bg-gray-700 rounded-l-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
            <SubmitButton
              pendingText='検索中...'
              className='px-6 py-6 h-8  w-auto bg-gray-900 text-white font-bold rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition-colors'
            >
              検索
            </SubmitButton>
          </form>
        </div>
      </nav>

      <main className='flex-1 container mx-auto px-4 py-8'>
        <section className='space-y-6'>
          {videoData.map((video) => (
            <VideoItem key={video.id} video={video} router={router} />
          ))}
        </section>
      </main>
    </div>
  )
}
