import Builder from '@/components/Builder'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Builder />
    </Suspense>
  )
}

export default page