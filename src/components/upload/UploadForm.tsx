'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { submit } from './action'
import Article from '../video/Article'
interface UploadFormProps {
  onChange: (
    formData: Partial<{
      title: string
      manimCode: string
      thumbnailFile: File | null
      tags: string[]
      manimFile: File | null
      description: string
      algorithmExplanation: string
      references: string[]
    }>
  ) => void
}

export default function UploadForm({ onChange }: UploadFormProps) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [manimFile, setManimFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [algorithmExplanation, setAlgorithmExplanation] = useState('')
  const [references, setReferences] = useState<string[]>([])
  const [newReference, setNewReference] = useState('')
  const [isLoadingManim, setIsLoadingManim] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (field: string, value: string | File | string[] | null) => {
    if (field === 'tags') {
      onChange({ tags: [...tags, value as string] })
    } else {
      onChange({ [field]: value })
    }
  }

  const handleManimSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!manimFile) return

    setIsLoadingManim(true)
    try {
      const formData = new FormData()
      formData.append('file', manimFile)

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploadcode/`, {
        method: 'POST',
        body: formData,
      })
      const videoBlob = await response.blob()
      const url = URL.createObjectURL(videoBlob)
      setPreviewUrl(url)
    } catch (error) {
      console.error('Error during Manim conversion:', error)
      // エラー処理を追加（例：エラーメッセージの表示）
    } finally {
      setIsLoadingManim(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingSubmit(true)

    try {
      // Server Actionを呼び出す
      const submitFormData = new FormData()
      submitFormData.append('title', title)
      submitFormData.append('tags', tags.join(','))
      submitFormData.append('description', description)
      submitFormData.append('algorithmExplanation', algorithmExplanation)
      submitFormData.append('references', references.join(','))
      if (manimFile) submitFormData.append('manimFile', manimFile)
      if (thumbnailFile) submitFormData.append('thumbnailFile', thumbnailFile)
      if (previewUrl) {
        const response = await fetch(previewUrl)
        const videoBlob = await response.blob()
        submitFormData.append('videoBlob', videoBlob)
      }

      const result = await submit(submitFormData)
      console.log('Upload result:', result)

      // 成功メッセージの表示やリダイレクトなどの処理をここに追加
    } catch (error) {
      console.error('Error during form submission:', error)
      // エラー処理を追加（例：エラーメッセージの表示）
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const handleManimFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setManimFile(file)
      handleChange('manimFile', file)
    }
  }

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      handleChange('thumbnailFile', file)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault()
      const newTags = [...tags, currentTag.trim()]
      setTags(newTags)
      setCurrentTag('')
      handleChange('tags', newTags)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    handleChange('tags', newTags)
  }

  const handleAddReference = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newReference.trim() !== '') {
      e.preventDefault()
      const updatedReferences = [...references, newReference.trim()]
      setReferences(updatedReferences)
      setNewReference('')
      handleChange('references', updatedReferences)
    }
  }

  const handleRemoveReference = (index: number) => {
    const updatedReferences = references.filter((_, i) => i !== index)
    setReferences(updatedReferences)
    handleChange('references', updatedReferences)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Manimファイル</h3>
        <Input
          id='manim-file'
          type='file'
          accept='.py'
          onChange={handleManimFileChange}
          className='w-full bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-600'
        />
      </div>
      <Button
        onClick={handleManimSubmit}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white'
        disabled={isLoadingManim || !manimFile}
      >
        {isLoadingManim ? 'アニメーション作成中...' : '動画に変換する'}
      </Button>
      {previewUrl && (
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>プレビュー</h3>
          <video src={previewUrl} controls className='w-full mt-2' />
        </div>
      )}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>サムネイルファイル</h3>
        <Input
          id='thumbnail-file'
          type='file'
          accept='.png, .jpg, .jpeg'
          onChange={handleThumbnailFileChange}
          className='w-full bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-600'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>タイトル</h3>
        <Input
          id='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            handleChange('title', e.target.value)
          }}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='タイトルを入力してください'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>タグ</h3>
        <div className='flex flex-wrap gap-2 mb-2 bg-gray-800 p-2 rounded min-h-[40px]'>
          {tags.map((tag) => (
            <Badge key={tag} variant='secondary' className='bg-gray-700 text-white'>
              {tag}
              <button
                type='button'
                onClick={() => handleRemoveTag(tag)}
                className='ml-1 text-gray-400 hover:text-white'
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
        <Input
          id='tags'
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='タグを入力してEnterを押す'
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>動画説明</h3>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleChange('description', e.target.value)
          }}
          className='w-full bg-gray-800 border-gray-700 text-white'
          placeholder='動画の説明を入力してください'
          rows={10}
        />
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>参考文献</h3>
        <Input
          type='text'
          value={newReference}
          onChange={(e) => setNewReference(e.target.value)}
          onKeyDown={handleAddReference}
          placeholder='新しい参考文献を入力してEnterを押す'
          className='w-full bg-gray-800 border-gray-700 text-white'
        />
        <div className='flex flex-wrap gap-2'>
          {references.map((ref, index) => (
            <Badge key={index} variant='secondary' className='bg-gray-700 text-white'>
              {ref}
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='ml-2 p-0 h-auto'
                onClick={() => handleRemoveReference(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
      <div className='space-y-8 md:flex md:space-x-4 md:space-y-0'>
        <div className='w-full md:w-1/2 space-y-4'>
          <h3 className='text-lg font-semibold '>アルゴリズム解説</h3>
          <Textarea
            id='algorithm-explanation'
            value={algorithmExplanation}
            onChange={(e) => {
              setAlgorithmExplanation(e.target.value)
              handleChange('algorithmExplanation', e.target.value)
            }}
            className='w-full h-96 bg-gray-800 border-gray-700 text-white overflow-y-scroll resize-none'
            placeholder='アルゴリズムの解説をマークダウン形式で入力してください'
            rows={10}
          />
        </div>
        <div className='w-full md:w-1/2 space-y-4'>
          <h3 className='text-lg font-semibold mb-2'>アルゴリズム解説プレビュー</h3>
          <div className='bg-gray-800 p-4 rounded-lg h-96 overflow-y-scroll'>
            <Article algorithmData={algorithmExplanation} />
          </div>
        </div>
      </div>

      <Button
        type='submit'
        className='w-full bg-blue-600 hover:bg-blue-700 text-white'
        disabled={isLoadingSubmit}
        formAction={submit}
      >
        {isLoadingSubmit ? 'アップロード中...' : '投稿する'}
      </Button>
    </form>
  )
}
