import React from 'react'
import {AiFillGithub, AiOutlineGlobal} from 'react-icons/ai'

export default function Footer() {
  return (
    <div className='text-center pt-3 pb-5 text-neutral-500 text-sm'>
        <div className='flex justify-center gap-x-2'>
        
            <p className='mr-3'>
                Created by Faiz Firdaus - 2023
            </p>
            <a href='https://github.com/faizfrds' target='#'>
                <AiFillGithub size={18} className="hover:text-neutral-300 transition" />
            </a>
            <a href='https://www.faizfirdaus.cloud/' target='#'>
                <AiOutlineGlobal size={18} className="hover:text-neutral-300 transition" />
            </a>
            
        </div>
        <div>
            
        </div>
        
    </div>
  )
}
