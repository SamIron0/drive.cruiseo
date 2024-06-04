"use client"

import { useContext, useEffect } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"

interface GridProps {}
export function Accepted() {
  const { availableTrips, setAvailableTrips } = useContext(CruiseoContext)
  return (
    <div>
      
    </div>
  )
}
