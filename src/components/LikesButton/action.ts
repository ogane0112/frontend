// action.ts
'use server'

import { createClient } from '@/utils/supabase/server'

export async function getVideoLikes(videoId: number) {
  const supabase = createClient()

  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('video_id', videoId)

  if (error) {
    console.error('Error fetching like count:', error)
    return 0
  }

  return count || 0
}

export async function toggleLike(videoId: number) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Error fetching user:', userError)
    return { success: false, message: 'User not authenticated' }
  }

  const { data, error: authidError } = await supabase
    .from('users')
    .select('id')
    .eq('auth_id', user?.id)

  if (authidError) {
    throw new Error('ログインがありません')
  }

  const userId = data[0].id

  // Check if the like already exists
  const { data: existingLike, error: fetchError } = await supabase
    .from('likes')
    .select()
    .eq('video_id', videoId)
    .eq('user_id', userId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching like:', fetchError)
    return { success: false, message: 'Failed to fetch like status' }
  }

  if (existingLike) {
    // Remove the like if it exists
    const { error: deleteError } = await supabase.from('likes').delete().eq('id', existingLike.id)

    if (deleteError) {
      console.error('Error removing like:', deleteError)
      return { success: false, message: 'Failed to remove like' }
    }

    return { success: true, liked: false }
  } else {
    // Add a new like if it doesn't exist
    const { error: insertError } = await supabase
      .from('likes')
      .insert({ video_id: videoId, user_id: userId })

    if (insertError) {
      console.error('Error adding like:', insertError)
      return { success: false, message: 'Failed to add like' }
    }

    return { success: true, liked: true }
  }
}

export async function getLikeStatus(videoId: number) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Error fetching user:', userError)
    return { success: false, message: 'User not authenticated' }
  }

  const { data, error } = await supabase
    .from('likes')
    .select()
    .eq('video_id', videoId)
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching like status:', error)
    return { success: false, message: 'Failed to fetch like status' }
  }

  return { success: true, liked: !!data }
}
