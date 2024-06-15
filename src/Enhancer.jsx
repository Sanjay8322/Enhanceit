import React, { useState } from 'react'
import { fetchGPT4Response } from './AIservice'
import { TailSpin } from 'react-loader-spinner'
import CopyToClipboard from 'react-copy-to-clipboard'
import logo from '../src/assets/logo.png'

const Enhancer = () => {
    const [ prompt , setPrompt]=useState('')
    const [response,setResponse]=useState('')
    const [spinner, setSpinner]=useState(false)
    const [copied,setCopied]=useState(false)
    
    const handleCorrect=async(e)=>{
        setCopied(false)
        setSpinner(true)
        try{
            let input = `"${prompt}" + correct this`
            const res = await fetchGPT4Response(input)
            setResponse(res)
            setSpinner(false)
        }
        catch(err){
            setResponse('Error getting response')
        }
    }

    const handleEnhance = async(e)=>{
        setCopied(false)
        setSpinner(true)
        try{
            let input = `"${prompt}" + correct this & make this better. `
            const res = await fetchGPT4Response(input)
            setResponse(res)
            setSpinner(false)
        }
        catch(err){
            setResponse('Error getting response')
        }
    }

  return (
        <div className='flex flex-col justify-center items-center h-screen p-5'>
             <img src={logo} alt="" className='mt-5 mb-10 w-44'/>
        <div className='flex flex-wrap gap-4 justify-center items-center ' >
           
            <div className='h-80 w-72 flex flex-col'>
                <textarea className='border w-full h-full rounded-xl focus:outline-none p-5' placeholder='Type your content here' value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                <div className='flex justify-center items-center mt-5 space-x-5 '>
                    <button className='bg-black text-[#F1F1EC] tracking-wide py-2 px-4 rounded-xl hover:text-black hover:border border-black hover:bg-[#F1F1EC]' onClick={handleCorrect}>CORRECT</button>
                    <button className='bg-black text-[#F1F1EC] tracking-wide py-2 px-4 rounded-xl hover:text-black hover:border border-black hover:bg-[#F1F1EC]' onClick={handleEnhance}>ENHANCE</button>
                </div>
            </div>
            {spinner && <TailSpin color='black' />}
            {response && (
                <div className='h-80 w-72 flex flex-col'>
                    <textarea className='border w-full h-full rounded-xl focus:outline-none p-5 bg-white' value={response} disabled></textarea>
                    <div className='flex justify-center items-center mt-5 space-x-5 '>
                        <CopyToClipboard text={response}>
                            <button className='bg-black text-[#F1F1EC] tracking-wide py-2 px-4 rounded-xl hover:text-black hover:border border-black hover:bg-[#F1F1EC]' onClick={() => setCopied(true)}>{copied ? 'COPIED!' : "COPY"}</button>
                        </CopyToClipboard>
                    </div>
                </div>
            )}
        </div>
    </div>

  )
}

export default Enhancer

