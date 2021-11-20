const createCataloguePage = () => {
  const onCreateButtonClick = () => {}

  return (
    <div className="flex justify-center items-center h-rel-screen">
      <form className="w-96 flex flex-col p-5 bg-white rounded-lg space-y-10">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="">
            Название канала
          </label>
          <input
            className="px-3 py-2 border-2 border-grey-500 rounded-md "
            type="text"
            placeholder="Одежда"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="">
            Адрес
          </label>
          <input
            className="px-3 py-2 border-2 border-grey-500 rounded-md "
            type="text"
            placeholder="luckybuyer888_clothes"
          />
        </div>

        <button
          className="py-2 rounded-md bg-green-500 text-lg text-white font-medium"
          onClick={onCreateButtonClick}
        >
          Создать
        </button>
      </form>
    </div>
  )
}

export default createCataloguePage
