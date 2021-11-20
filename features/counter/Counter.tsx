import { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice'

function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <button
          className="w-10 h-10 rounded-md bg-red-500 text-3xl text-white"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className="text-3xl">{count}</span>
        <button
          className="w-10 h-10 rounded-md bg-green-500 text-3xl text-white"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        <input
          className="border-2 border-gray-400 rounded-md p-2 text-lg font-medium"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="rounded-md bg-green-300"
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className="rounded-md bg-green-300"
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className="rounded-md bg-green-300"
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}

export default Counter
