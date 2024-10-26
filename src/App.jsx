
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null)

  //useCallback
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "123456789"
    if(charAllowed) str += "!@#$%^&*(){}?/<`~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, 
  [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },
[password])

    //useEffect hook
      useEffect(()=>{
      passwordGenerator()
    },
      [length, numberAllowed, charAllowed, passwordGenerator]
    )
  return (
    <div>
    <div 
    className='w-full max-w-md mx-auto text-orange-500 rounded-lg shadow-xl bg-gray-700 px-4 my-8 text-center'>
      <h1 className='text-white text-xl font-semibold py-2'>Password Generator</h1>
        <div className='flex overflow-hidden shadow-lg rounded-lg mb-4'>
          <input 
          type="text" 
          placeholder="password" 
          readOnly 
          value={password}
          ref = {passwordRef} 
          className='outline-none w-full py-1 px-3 my-3 rounded-md'/>

          {/* Copy Button */}
          <button
          onClick={copyPasswordToClipboard}
          className='bg-blue-800 text-white outline-none px-3 shrink-0 h-10 my-2 rounded-lg copy-btn'>
            copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>

        {/* lenght */}
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6} 
            max={50} 
            value={length} 
            className='cursor-pointer'
            onChange={(e)=>(setLength(e.target.value))} />
            <label htmlFor="lenght">length : {length}</label>
          </div>

        {/* Numbers */}
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>
            {setNumberAllowed((prev) => !prev)}} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

        {/* Characters */}
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>
            {setCharAllowed((prev) => !prev)}} />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
      </div>
  )
}

export default App

