'use client'
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MapPin, Globe, X } from 'lucide-react'
import { getUserProfile, updateUserProfile } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Video {
  id: number // string から number に変更
  title: string
}

export default function Component() {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [description, setDescription] = useState('')
  const [country, setCountry] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')

  const [uploadedVideos, setUploadedVideos] = useState<Video[]>([])
  const [likedVideos, setLikedVideos] = useState<Video[]>([])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const profile = await getUserProfile()
        setUsername(profile.username || '')
        setAvatar(profile.avatar || '')
        setDescription(profile.description || '')
        setCountry(profile.country || '')
        setTwitterUrl(profile.twitter_url || '')
        setGithubUrl(profile.github_url || '')
        setUploadedVideos(profile.uploadedVideos || [])
        // setLikedVideos(profile.likedVideos || [])
        setIsLoggedIn(true)
      } catch (error) {
        console.error('プロフィール取得エラー:', error)
        setIsLoggedIn(false)
      }
    }
    fetchUserProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await updateUserProfile({
        username,
        twitter_url: twitterUrl,
        github_url: githubUrl,
        description,
        country,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('プロフィール更新エラー:', error)
      // エラーメッセージを表示するなどのエラーハンドリングを行う
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* ログイン状態表示 */}
        <div className='bg-gray-800 rounded-lg shadow-lg p-4 mb-4'>
          <p className='text-lg font-semibold'>
            セッション状態:{' '}
            {isLoggedIn ? (
              <span className='text-green-500'>ログイン中</span>
            ) : (
              <span className='text-red-500'>ログアウト</span>
            )}
          </p>
        </div>

        <div className='bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
          <div className='relative h-48 bg-gradient-to-r from-blue-500 to-purple-600'>
            <Avatar className='absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 border-4 border-gray-800'>
              <AvatarImage src={avatar || '/placeholder-avatar.jpg'} alt={username} />
              <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className='pt-20 px-4 pb-4'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                {isEditing ? (
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='text-2xl font-bold bg-gray-700'
                  />
                ) : (
                  <h1 className='text-2xl font-bold'>{username}</h1>
                )}
              </div>
              <div>
                {isEditing ? (
                  <Button onClick={handleSave}>保存</Button>
                ) : (
                  <Button onClick={handleEdit}>編集</Button>
                )}
              </div>
            </div>
            <div className='space-y-4'>
              {isEditing ? (
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='bg-gray-700'
                  placeholder='自己紹介'
                />
              ) : (
                <p>{description}</p>
              )}
              {/* 投稿した動画リスト */}
              <div className='mb-4'>
                <h2 className='text-lg font-bold'>投稿した動画</h2>
                <ul className='list-disc pl-5'>
                  {uploadedVideos.map((video) => (
                    <li key={video.id}>{video.title}</li>
                  ))}
                </ul>
              </div>

              {/* いいねした動画リスト */}
              {/* <div className='mb-4'>
                <h2 className='text-lg font-bold'>いいねした動画</h2>
                <ul className='list-disc pl-5'>
                  {likedVideos.map((video) => (
                    <li key={video.id}>{video.title}</li>
                  ))}
                </ul>
              </div> */}
              <div className='flex flex-wrap gap-4'>
                <div className='flex items-center'>
                  <MapPin className='mr-2 h-4 w-4 text-gray-400' />
                  {isEditing ? (
                    <Input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className='bg-gray-700'
                      placeholder='国'
                    />
                  ) : (
                    <span>{country}</span>
                  )}
                </div>
                <div className='flex items-center'>
                  <X className='mr-2 h-4 w-4 text-gray-400' />
                  {isEditing ? (
                    <Input
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className='bg-gray-700'
                      placeholder='Twitter URL'
                    />
                  ) : (
                    <a
                      href={twitterUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {twitterUrl}
                    </a>
                  )}
                </div>
                <div className='flex items-center'>
                  <Globe className='mr-2 h-4 w-4 text-gray-400' />
                  {isEditing ? (
                    <Input
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className='bg-gray-700'
                      placeholder='ウェブサイトURL'
                    />
                  ) : (
                    <a
                      href={githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      {githubUrl}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
