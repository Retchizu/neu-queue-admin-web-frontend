import { useVerifyUser } from '@/hooks/useVerifyUser'
import React from 'react'

const Pending = () => {
  useVerifyUser();
  return (
    <div>
      review-pending
    </div>
  )
}

export default Pending
