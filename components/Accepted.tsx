"use client"

import { useContext, useEffect, useState } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"
import { toast } from "sonner"

interface AcceptedProps {
  onCancelTrip: (trip: any) => void
}
export function Accepted( { onCancelTrip }: AcceptedProps) {
  const { driver, acceptedTrips, setAcceptedTrips, setAvailableTrips } =
    useContext(CruiseoContext)

  
  return (
    <div>
      {acceptedTrips ? (
        <TripBox
          state="accepted"
          onSelectTrip={onCancelTrip}
          trips={acceptedTrips}
        />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
