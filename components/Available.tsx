"use client"

import { useContext } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"

interface GridProps {}
export function Available() {
  const { availableTrips, setAvailableTrips } = useContext(CruiseoContext)
  const handleSelectTrip = (trip: any) => {}
  return (
    <div>
      {availableTrips ? (
        <TripBox
          onSelectTrip={handleSelectTrip}
          trips={availableTrips}
          selectedTrip={null}
        />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
