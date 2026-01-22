import React from 'react'

const Textarea = ({ label, rows, placeholder }) => {
  return (
    <>
      <label htmlFor="" className='font-medium'>{label}</label>
      <textarea  rows={rows} placeholder={placeholder} className='border bg-stone-100 p-4 rounded-md' />
    </>
  )
}

export default Textarea