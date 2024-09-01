'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submit(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // usersテーブルから対応するレコードを取得
  const { data, error } = await supabase.from('users').select('id').eq('auth_id', user?.id)

  if (!user) throw new Error(`User not found${error}`)

  const title = formData.get('title') as string
  const tags = (formData.get('tags') as string).split(',')
  const description = formData.get('description') as string
  const algorithmExplanation = formData.get('algorithmExplanation') as string
  const references = (formData.get('references') as string).split(',')
  const manimFile = formData.get('manimFile') as File
  const thumbnailFile = formData.get('thumbnailFile') as File
  const videoBlob = formData.get('videoBlob') as Blob

  const now = new Date().toISOString()

  const manimFileName = `manim/${user.id}/${Date.now()}_${manimFile.name}`
  const thumbnailFileName = `thumbnails/${user.id}/${Date.now()}_${thumbnailFile.name}`
  const videoFileName = `videos/${user.id}/${Date.now()}_generated_video.mp4`
  const mdFileName = `articles/${user.id}/${Date.now()}_algorithm_explanation.md`

  // Manimファイルのアップロード
  const { error: manimUploadError } = await supabase.storage
    .from('videos')
    .upload(manimFileName, manimFile)
  if (manimUploadError) throw manimUploadError

  // サムネイルのアップロード
  const { error: thumbnailUploadError } = await supabase.storage
    .from('videos')
    .upload(thumbnailFileName, thumbnailFile)
  if (thumbnailUploadError) throw thumbnailUploadError

  // 生成された動画のアップロード
  const { error: videoUploadError } = await supabase.storage
    .from('videos')
    .upload(videoFileName, videoBlob)
  if (videoUploadError) throw videoUploadError

  // アルゴリズム説明（MD）のアップロード
  const { error: mdUploadError } = await supabase.storage
    .from('videos')
    .upload(mdFileName, algorithmExplanation)
  if (mdUploadError) throw mdUploadError

  // 公開URLの取得
  const { data: manimUrlData } = await supabase.storage.from('videos').getPublicUrl(manimFileName)
  const { data: thumbnailUrlData } = await supabase.storage
    .from('videos')
    .getPublicUrl(thumbnailFileName)
  const { data: videoUrlData } = await supabase.storage.from('videos').getPublicUrl(videoFileName)
  const { data: mdUrlData } = await supabase.storage.from('videos').getPublicUrl(mdFileName)

  // videosテーブルに新しいレコードを挿入
  const { data: videoData, error: videoError } = await supabase
    .from('videos')
    .insert({
      user_id: data[0].id,
      title,
      description,
      video_url: videoUrlData.publicUrl,
      manim_url: manimUrlData.publicUrl,
      thumbnail_url: thumbnailUrlData.publicUrl,
      views: 0,
      article_url: mdUrlData.publicUrl,
      created_at: now,
      updated_at: now,
    })
    .select()

  if (videoError) throw videoError

  const videoId = videoData[0].id

  // タグの処理
  for (const tagName of tags) {
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .upsert({ name: tagName }, { onConflict: 'name' })
      .select()

    if (tagError) throw tagError

    if (tagData && tagData[0]) {
      const { error: videoTagError } = await supabase.from('video_tags').insert({
        video_id: videoId,
        tag_id: tagData[0].id,
        created_at: now,
      })
      if (videoTagError) throw videoTagError
    }
  }

  // 参考文献の処理
  for (const reference of references) {
    // まず、reference_itemsテーブルに参考文献を挿入または更新
    const { data: referenceData, error: referenceError } = await supabase
      .from('reference_items')
      .upsert(
        {
          title: reference,
          url: reference, // URLとして使用。必要に応じて変更してください。
        },
        {
          onConflict: 'url', // URLが一意であると仮定
          ignoreDuplicates: false,
        }
      )
      .select()

    if (referenceError) {
      console.error('Reference insert error:', referenceError)
      throw referenceError
    }

    if (referenceData && referenceData[0]) {
      // video_referencesテーブルに関連付けを挿入
      const { error: videoReferenceError } = await supabase.from('video_references').insert({
        video_id: videoId,
        reference_id: referenceData[0].id,
        created_at: now,
      })

      if (videoReferenceError) {
        console.error('Video reference insert error:', videoReferenceError)
        throw videoReferenceError
      }
    }
  }

  revalidatePath('/videos')

  return { message: 'Video uploaded successfully', videoId, videoUrl: videoUrlData.publicUrl }
}
