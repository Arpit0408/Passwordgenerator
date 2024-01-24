import { useState , useCallback ,useEffect ,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(5)
  const [num, setNum] = useState(false)
  const [char, setchar] = useState(true)
  const [Password, setpassword] = useState("")

  // useref
  const paassref = useRef(null)

const Passwordgenerator=useCallback(()=>{
  let pass = ""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(num) str += "0123456789"
  if(char) str += "!@#$%^&*"

  for (let index = 1; index <= length; index++) {
   let charac = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(charac)        
  }
  setpassword(pass)

},[length,num,char,setpassword])
useEffect(()=>{
  Passwordgenerator()
},[length , num , char , Passwordgenerator])

const Copypasswordtoclipboard =useCallback(()=>{window.navigator.clipboard.writeText(Password)},[Password])
  return (
    <>
      <h1 className='text-4xl text-center'>Password generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black tex bg-slate-500 p-5">
       <div className="flex shadow-lg overflow-hidden mb-5 rounded-lg">
        <input type="text" 
        value={Password}
         className='outline-none  w-full py-i px-3'
         placeholder='Password'
         readOnly
         ref={paassref}
         />
         <button className=
         'text-2xl mb-2 ml-5 bg-white rounded-md mt-2 p-2'
          onClick={Copypasswordtoclipboard}
         >Copy</button>
        
       </div>
       <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
          min={5}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked = {num}
          id='numInput'
          onChange={()=>{
            setNum((prev)=>!prev)
          }}
          />
          Number
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked = {char}
          id='charInput'
          onChange={()=>{
            setchar((prev)=>!prev)
          }}
          />
          Char
        </div>
       </div>
      </div>

    </>
  )
}

export default App
