// components/LikeButton.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'
import { toggleLike, getLikeStatus, getVideoLikes } from './action'

interface LikeButtonProps {
  videoId: number
}

interface ToggleLikeResult {
  success: boolean
  liked?: boolean
  message?: string
}

interface LikeStatusResult {
  success: boolean
  liked?: boolean
  message?: string
}

export default function LikeButton({ videoId }: LikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const likeStatus: LikeStatusResult = await getLikeStatus(videoId)
        const initialLikes: number = await getVideoLikes(videoId)
        if (likeStatus.success && likeStatus.liked !== undefined) {
          setLiked(likeStatus.liked)
        }
        setLikeCount(initialLikes)
      } catch (err) {
        setError('Failed to fetch initial data')
        console.error('Error fetching initial data:', err)
      }
    }
    fetchInitialData()
  }, [videoId])

  const handleLike = useCallback(async () => {
    try {
      const result: ToggleLikeResult = await toggleLike(videoId)
      if (result.success && result.liked !== undefined) {
        setLiked(result.liked)
        setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1))
      } else {
        setError(result.message || 'Failed to toggle like')
      }
    } catch (err) {
      setError('An error occurred while processing your request')
      console.error('Error toggling like:', err)
    }
  }, [videoId])

  if (error) {
    return <div className='text-red-500'>{error}</div>
  }

  return (
    <Button
      variant='outline'
      className={`flex items-center gap-2 ${
        liked ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
      } hover:bg-gray-700`}
      onClick={handleLike}
    >
      <ThumbsUp className='h-4 w-4' />
      {likeCount}
    </Button>
  )
}
