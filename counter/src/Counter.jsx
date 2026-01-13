import React from 'react'
import { useState } from 'react';
import './Counter.css'

export default function () {
  const [count, setCount] = useState(0);

  let incrementCount = () => {
    setCount(count + 1);
  }

  let decrementCount = () => {
    setCount((count) => {
      if(count>0){
        return count-1
      }
      return count
    });
  }

  let resetCount = () => {
    setCount(0);
  }

  return (
  
    <div className='Counter'>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={incrementCount}>+1</button>
      <button onClick={decrementCount}>-1</button>
      <button onClick={resetCount}>reset</button>
    </div>
  )
}
