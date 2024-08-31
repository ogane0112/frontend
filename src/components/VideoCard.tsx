import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import TagList from './TagList'

type Video = {
  id: number
  title: string
  username: string
  views: number
  likes_count: number // likes を likes_count に変更
  thumbnail_url: string // imageUrlをthumbnail_urlに変更
  video_tags: string[]
}

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <Link href={`/video/${video.id}`} className='block'>
      <Card className='bg-gray-800 text-white hover:bg-gray-700 transition-colors h-[320px]'>
        <CardContent className='p-0'>
          <div className='relative w-full h-40'>
            <Image
              src={video.thumbnail_url} // imageUrlをthumbnail_urlに変更
              alt={video.title}
              fill
              className='object-cover rounded-t-md'
            />
          </div>
          <div className='p-3'>
            <h2 className='text-sm font-semibold mb-1 truncate' title={video.title}>
              {video.title}
            </h2>
            <p className='text-xs text-gray-400 truncate'>{video.username}</p>
            <p className='text-xs text-gray-400 mb-2'>
              {video.views.toLocaleString()} 回視聴 • {video.likes_count.toLocaleString()} いいね
            </p>
            <TagList tags={video.video_tags} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default VideoCard
