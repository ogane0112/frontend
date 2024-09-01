import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: Request) {
  const formData = (await request.formData()) as FormData
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(`${Date.now()}_${file.name}`, file)

    if (error) throw error

    return NextResponse.json({ success: true, path: data.path })
  } catch (error) {
    console.error('アップロードエラー:', error)
    return NextResponse.json({ error: 'アップロードに失敗しました' }, { status: 500 })
  }
}
