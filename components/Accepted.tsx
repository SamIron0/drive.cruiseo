"use client"

import { useContext, useEffect, useState } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"
import { toast } from "sonner"

interface GridProps {}
export function Accepted() {
  const { driver, acceptedTrips, setAcceptedTrips, setAvailableTrips } =
    useContext(CruiseoContext)

  const handleCancelTrip = async (trip: any) => {
    const res = await fetch("api/canceltrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ trip })
    })

    if (res.status !== 200) {
      toast.error("Error cancelling trip")
    }

    //after acceptting trip, rettrieve available trips
    const accepted_result = await fetch("/api/getAcceptedTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driver_id: driver?.id })
    })
    const available_result = await fetch("/api/availabletrips", {
      method: "GET"
    })
    const available_data = await available_result.json()
    const accepted_data = await accepted_result.json()

    if (accepted_result.status !== 200) {
      toast.error("Error cancelling trip")
    }

    setAcceptedTrips(accepted_data)
    setAvailableTrips(available_data)

    toast.success("Trip Cancelled")
    return
  }
  return (
    <div>
      {acceptedTrips ? (
        <TripBox
          state="accepted"
          onSelectTrip={handleCancelTrip}
          trips={acceptedTrips}
        />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
