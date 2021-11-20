import React, { useState } from 'react'

const createProductPage = () => {
  const [pictureInputCount, setPictureInputCount] = useState(1)

  const [pictureUrls, setPictureUrls] = useState([{ id: 1, pictureUrl: '' }])

  const onCreateButtonClick = () => {}

  const onAddClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPictureInputCount(pictureInputCount + 1)
    pictureUrls.push({ id: pictureUrls.length + 1, pictureUrl: '' })
  }

  const onUrlInputChange = (id: number, value: string) => {
    pictureUrls[id - 1].pictureUrl = value
    setPictureUrls(pictureUrls)
  }

  return (
    <div className="flex h-rel-screen px-10 py-5">
      <form className="grid grid-cols-2 grid-rows-6 gap-5 w-full h-full">
        <div className="row-span-5 rounded-lg bg-white p-10 space-y-5">
          <div className="flex flex-col space-y-2">
            <span>{pictureUrls[0].pictureUrl}</span>
            <label className="text-xl font-medium" htmlFor="">
              Название товара
            </label>
            <input
              className="px-3 py-2 border-2 rounded border-grey-200"
              type="text"
              placeholder="Куртка Весенняя"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-medium" htmlFor="">
              Описание товара
            </label>
            <textarea
              className="h-48 px-3 py-2 border-2 rounded border-grey-200 outline-none"
              placeholder="В описание товара могут входить его характеристики, например: его материал, сезон одежды, аксессуары и т.д."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-medium" htmlFor="">
              Каталог
            </label>
            <select
              className="px-3 py-2 border-2 rounded border-grey-200 outline-none"
              placeholder="Куртка Весенняя"
            >
              <option value="1">Верхняя одежда</option>
            </select>
          </div>
        </div>
        <div className="row-span-5 flex flex-col rounded-lg bg-white p-10 space-y-5 overflow-y-scroll scroll">
          <label className="text-xl font-medium" htmlFor="">
            Ссылки на картинки
          </label>
          {pictureUrls.map((pictureUrl) => (
            <input
              key={pictureUrl.id}
              className="px-3 py-2 border-2 rounded border-grey-200"
              type="text"
              placeholder="http://example.picture.resource/album/2/picture/5"
              onChange={(e) =>
                onUrlInputChange(pictureUrl.id, e.currentTarget.value)
              }
            />
          ))}
          <button
            className="rounded-md bg-blue-400 py-2 text-white font-medium"
            onClick={onAddClick}
          >
            Добавить картнику
          </button>
          {/* <p>{JSON.stringify(pictureUrls)}</p> */}
        </div>
        <button className="col-span-2 rounded-lg bg-green-500 text-2xl text-white font-medium">
          Создать
        </button>
      </form>
    </div>
  )
}

export default createProductPage
