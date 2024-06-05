"use client"

import { useContext, useEffect } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"
import { toast } from "sonner"

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

    //after acceptting trip, rettrieve available trips
    const result = await fetch("/api/availabletrips", { method: "GET" })
    const data = await result.json()
    setAvailableTrips(data)

    toast.success("Trip Accepted")
  }
  useEffect(() => {
    console.log(availableTrips)
  }, [])
  return (
    <div>
      {availableTrips ? (
        <TripBox onSelectTrip={handleSelectTrip} trips={availableTrips} />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
