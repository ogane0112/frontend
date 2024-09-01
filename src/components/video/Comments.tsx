'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Comment {
  id: number
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
}

export default function Comments({ comments }: { comments: Comment[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState('')
  const visibleComments = isExpanded ? comments : comments.slice(0, 1)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // ここでコメントを送信する処理を実装
    console.log('新しいコメント:', newComment)
    setNewComment('')
  }

  return (
    <div className='mt-8'>
      <h3 className='text-xl font-semibold mb-4'>コメント</h3>
      <form onSubmit={handleSubmitComment} className='mb-4'>
        <Input
          type='text'
          placeholder='コメントを追加...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='mb-2 text-gray-200 bg-gray-700 border-gray-600 focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400'
        />
        <Button type='submit'>コメントする</Button>
      </form>
      <ul className='space-y-4'>
        {visibleComments.map((comment) => (
          <li key={comment.id} className='bg-gray-800 p-4 rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <Avatar>
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className='font-semibold'>{comment.user.name}</span>
              <span className='text-gray-400 text-sm'>{comment.timestamp}</span>
            </div>
            <p className='mb-2'>{comment.content}</p>
          </li>
        ))}
      </ul>
      {comments.length > 2 && (
        <Button
          variant='ghost'
          className='mt-4 text-blue-400 hover:text-blue-300'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              コメントを折りたたむ <ChevronUp className='ml-1 h-4 w-4' />
            </>
          ) : (
            <>
              すべてのコメントを表示 <ChevronDown className='ml-1 h-4 w-4' />
            </>
          )}
        </Button>
      )}
    </div>
  )
}
