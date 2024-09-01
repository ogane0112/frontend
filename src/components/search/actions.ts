'use server'

import { redirect } from 'next/navigation'

export async function searchVideos(formData: FormData): Promise<void> {
  const query = formData.get('query') as string

  if (!query) {
    throw new Error('Query is required')
  }
  redirect(`/explore?query=${encodeURIComponent(query)}`)
}


