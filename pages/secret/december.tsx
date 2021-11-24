import React, { useState } from 'react'

const characterCounterPage = () => {
  let i = 0

  const [counter, setCounter] = useState(0)

  const [tag, setTag] = useState('')

  const [tags, setTags] = useState<{ id: number; tag: string }[]>([])

  const onAddClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (tag.length > 50) {
      return
    }

    const tmpTags = tags
    tmpTags.push({ id: tags.length, tag: tag })
    setTags(tmpTags)
    setTag('')
    setCounter(0)
    console.log(tmpTags)
    i++
  }

  const onDeleteClick = (e: React.FormEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    const tmpTags = tags.filter((tag) => tag.id !== id)
    setTags(tmpTags)
  }

  return (
    <div className="p-10 h-rel-screen">
      <div className="bg-white rounded-xl h-full p-10 space-y-3">
        <div className="space-y-3">
          <p className="space-x-2">
            <span className="text-lg font-medium">Счетчик символов:</span>
            <span
              className={
                counter < 50
                  ? 'text-xl font-medium'
                  : 'text-red-500 text-xl font-medium'
              }
            >
              {counter}
            </span>
          </p>
          <input
            className="w-full border-2 border-gray-200 rounded px-5 py-2 font-medium outline-none"
            value={tag}
            onChange={(e) => {
              setCounter(e.currentTarget.value.length)
              setTag(e.currentTarget.value)
            }}
          ></input>
          <button
            className="bg-green-400 text-white font-medium rounded-md px-3 py-2"
            onClick={onAddClick}
          >
            Добавить тег
          </button>
        </div>
        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex justify-between items-center bg-gray-400 text-white text-lg font-medium px-3 py-2 rounded"
            >
              <span>{tag.tag}</span>
              <button
                className="rounded bg-red-400 text-white font-medium px-2 py-1"
                onClick={(e) => onDeleteClick(e, tag.id)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default characterCounterPage
