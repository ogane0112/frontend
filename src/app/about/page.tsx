import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
export default function Component() {
  return (
    <div className='min-h-screen bg-[#1a1f2e] text-white'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8'>ManimTubeへようこそ</h1>

        <Card className='mb-8 bg-[#252b3d] text-white border-none'>
          <CardHeader>
            <CardTitle>ManimTubeとは？</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              ManimTubeは、Manim(Pythonのパッケージ)を使用したアルゴリズム解説動画を集めたプラットフォームです。数学や計算機科学の概念を視覚的に理解するのに役立ちます。
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue='home' className='mb-8'>
          <TabsList className='bg-[#252b3d] text-white'>
            <TabsTrigger value='home' className='data-[state=active]:bg-[#fffcff]'>
              ホーム画面
            </TabsTrigger>
            <TabsTrigger value='video' className='data-[state=active]:bg-[#fffcff]'>
              動画視聴
            </TabsTrigger>
            <TabsTrigger value='upload' className='data-[state=active]:bg-[#fffcff]'>
              アップロード
            </TabsTrigger>
            <TabsTrigger value='menu' className='data-[state=active]:bg-[#fffcff]'>
              メニュー
            </TabsTrigger>
          </TabsList>
          <TabsContent value='home'>
            <Card className='bg-[#252b3d] text-white border-none'>
              <CardHeader>
                <CardTitle>ホーム画面の使い方</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  ホーム画面では、様々なManimによるアルゴリズム解説動画が表示されます。各動画のサムネイルには、タイトル、作成者、再生回数などの情報が表示されます。
                </p>
                <img
                  src='/image/home.png?height=200&width=400'
                  alt='ホーム画面のイメージ'
                  className='mt-4 rounded-lg'
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='video'>
            <Card className='bg-[#252b3d] text-white border-none'>
              <CardHeader>
                <CardTitle>動画視聴ページ</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  動画をクリックすると、その動画の視聴ページに移動します。ここでは動画の再生と共に、詳細な説明文を読むことができます。いいねボタンを押すことで、動画をお気に入りに登録することができます。
                </p>
                <img
                  src='/image/detail.png?height=200&width=400'
                  alt='動画視聴ページのイメージ'
                  className='mt-4 rounded-lg'
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='upload'>
            <Card className='bg-[#252b3d] text-white border-none'>
              <CardHeader>
                <CardTitle>動画のアップロード</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  アップロードページでは、PythonのManimコードを入力するだけで、自動的にManim動画が生成されアップロードされます。説明文はマークダウン形式で記述できます。
                </p>
                <img
                  src='/image/upload.png?height=200&width=400'
                  alt='アップロードページのイメージ'
                  className='mt-4 rounded-lg'
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='menu'>
            <Card className='bg-[#252b3d] text-white border-none'>
              <CardHeader>
                <CardTitle>メニュー機能</CardTitle>
              </CardHeader>
              <CardContent>
                <p>画面左上のバーガーメニューをクリックすると、以下の機能にアクセスできます：</p>
                <ul className='list-disc list-inside mt-2'>
                  <li>ホーム</li>
                  <li>検索</li>
                  <li>概要</li>
                  <li>動画アップロード</li>
                  <li>お気に入り</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className='bg-[#252b3d] text-white border-none'>
          <CardHeader>
            <CardTitle>さあ、始めましょう！</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>
              ManimTubeを使って、アルゴリズムや数学の概念を視覚的に学びましょう。
            </p>
            <Link href='/signup' passHref legacyBehavior>
              <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4'>
                アカウントを作成
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
