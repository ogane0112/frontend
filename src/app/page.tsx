import Sidebar from '@/components/Sidebar'
import VideoCard from '@/components/VideoCard'

// データを別のオブジェクトとして定義
const featuredVideos = [
  {
    id: 1,
    title: 'Sorting Algorithm Visualization',
    author: 'AlgoMaster',
    views: 10000,
    likes: 500,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrreCfcSDMBZgSsNvhxgTpwlqxNIvR2OP08g&s',
    tags: ['アルゴリズム', 'ソート', '可視化', 'プログラミング', 'コンピューターサイエンス'],
  },
  {
    id: 2,
    title: 'グラフ走査の解説',
    author: 'コードニンジャ',
    views: 8000,
    likes: 400,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s',
    tags: ['グラフ理論', 'アルゴリズム', 'データ構造', '探索', '最適化'],
  },
  {
    id: 3,
    title: '動的計画法の基礎',
    author: 'DPエキスパート',
    views: 7500,
    likes: 350,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLFjSOsaXEnBI-iko6k9ma8FIEmlNki5RBg&s',
    tags: ['動的計画法', 'アルゴリズム', '最適化', '数学'],
  },
  {
    id: 4,
    title: '二分探索木の実装',
    author: 'ツリーマスター',
    views: 9000,
    likes: 450,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmU3M_3otC9tyg-3uUIzYMVtNPPOjpggRJg&s',
    tags: ['データ構造', 'アルゴリズム', '探索', '木構造'],
  },
  {
    id: 5,
    title: 'ダイクストラのアルゴリズムのウォークスルー',
    author: 'グラフガルー',
    views: 8500,
    likes: 420,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9C3cLQFPX1O0WL5AuUC4EaV3J0mk9co06Q&s',
    tags: ['グラフ理論', '最短経路', 'アルゴリズム', '探索'],
  },
  {
    id: 6,
    title: 'クイックソート vs マージソート',
    author: 'SortingPro',
    views: 7800,
    likes: 380,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahPlO0dH-nIRvDSfr7TawBUX4wUq4En9sjg&s',
    tags: ['ソート', 'アルゴリズム', 'データ構造', 'プログラミング'],
  },
  {
    id: 8,
    title: '複素数と複素平面',
    author: 'ComplexMathWizard',
    views: 13000,
    likes: 950,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbxpyHfjuffZLL2sKYjXSOzCFNugEjerTVEw&s',
    tags: ['数学', '複素数', '代数', '幾何学'],
  },
  {
    id: 9,
    title: '統計学の基礎',
    author: 'StatisticsGuru',
    views: 16000,
    likes: 1300,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s',
    tags: ['統計学', 'データ解析', '機械学習', '数学'],
  },
  {
    id: 10,
    title: 'ネットワーク理論入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zOkABWMXRVVoWonlyVXLn2ZHAcgiCKci_A&s',
    tags: ['ネットワーク理論', 'グラフ理論', 'アルゴリズム', '通信理論'],
  },
  {
    id: 11,
    title: '三角関数入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWjaYk-smRMeVBEoQr5oRzfB4xkHw_N0-3Q&s',
    tags: ['数学', '三角関数', '幾何学', '解析学'],
  },
  {
    id: 12,
    title: 'アルゴリズム入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVhrNLresww-TYkb7XfWfQmlQD-DA_OHMiOA&s',
    tags: ['アルゴリズム', 'プログラミング', 'データ構造', '数学'],
  },
  {
    id: 13,
    title: 'manim入門',
    author: 'NetworkTheoryPro',
    views: 9800,
    likes: 750,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGO5PRqFiCPW9vP67pmd1_EHPqM5N4CXroww&s',
    tags: ['アニメーション', 'manim', '数学', 'プログラミング'],
  },
]

export default function Component() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-6 bg-gray-900'>
          <h1 className='text-2xl font-bold mb-6 text-white'>Featured Videos</h1>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {featuredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
