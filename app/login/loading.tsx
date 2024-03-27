"use client"

import Box from "@/components/Box"
import { BounceLoader } from "react-spinners"

const Loading = () => {
  return (
    <Box>
      <BounceLoader color="#22C55E" size={40} />
    </Box>
  )
}

export default Loading