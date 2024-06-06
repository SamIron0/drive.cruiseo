"use client"

import { useContext, useEffect } from "react"
import { TripBox } from "./TripBox"
import { CruiseoContext } from "@/context/context"
import { toast } from "sonner"
import { Tables } from "@/supabase/types"

interface AvailableProps {
  onAcceptTrip: (trip: Tables<"trips">) => void
}
export function Available({ onAcceptTrip }: AvailableProps) {
  const { availableTrips, setAvailableTrips, driver, setAcceptedTrips } =
    useContext(CruiseoContext)
  
  return (
    <div className="w-full">
      {availableTrips ? (
        <TripBox
          state="available"
          onSelectTrip={onAcceptTrip}
          trips={availableTrips}
        />
      ) : (
        <p>No trips available</p>
      )}
    </div>
  )
}
