import type { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <div className="flex p-5 h-rel-screen">
      <div className="w-full rounded-lg bg-white px-6 py-4">
        <h1 className="text-2xl font-medium">Главная</h1>
        <span>
          {process.env.NEXT_PUBLIC_API_URL ??
            'NEXT PUBLIC API_URL is undefined'}
        </span>
      </div>
    </div>
  )
}

export default IndexPage
