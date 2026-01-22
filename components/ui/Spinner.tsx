import { Loader2 } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className="text-center py-10 flex flex-col justify-center items-center">
      <Loader2 size={50} className="animate-spin"/>
      <span className="text-xl">Loading...</span>
    </div>
  )
}

export default Spinner