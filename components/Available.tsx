"use client"

import { useContext } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"

interface GridProps {}
export function Available() {
  const { availableTrips, setAvailableTrips } = useContext(CruiseoContext)
  const handleSelectTrip = async (trip: any) => {
    const res = await fetch("api/acceptTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ trip })
    })
  }
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
