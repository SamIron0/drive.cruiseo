"use client"

import { useContext, useEffect } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"
import { toast } from "sonner"

interface GridProps {}
export function Available() {
  const { availableTrips, setAvailableTrips, driver,setAcceptedTrips } =
    useContext(CruiseoContext)
  const handleSelectTrip = async (trip: any) => {
    const res = await fetch("api/acceptTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ trip })
    })

    //after acceptting trip, rettrieve available trips
    const available_result = await fetch("/api/availabletrips", {
      method: "GET"
    })
    const accepted_result = await fetch("/api/getAcceptedTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driver_id: driver?.id })
    })
    const available_data = await available_result.json()
    const accepted_data = await accepted_result.json()

    setAvailableTrips(available_data)
    setAcceptedTrips(accepted_data)

    toast.success("Trip Accepted")
  }
  return (
    <div className="w-full">
      {availableTrips ? (
        <TripBox onSelectTrip={handleSelectTrip} trips={availableTrips} />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
