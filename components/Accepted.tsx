"use client"

import { useContext, useEffect, useState } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"
import { toast } from "sonner"

interface GridProps {}
export function Accepted() {
  const { acceptedTrips, setAcceptedTrips } = useContext(CruiseoContext)

  const handleCancelTrip = async (trip: any) => {
    const res = await fetch("api/cancelTrip", {
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
    const result = await fetch("/api/acceptedtrips", { method: "GET" })
    const data = await result.json()
    setAcceptedTrips(data)

    toast.success("Trip Cancelled")
  }
  return (
    <div>
      {acceptedTrips ? (
        <TripBox onSelectTrip={handleCancelTrip} trips={acceptedTrips} />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
