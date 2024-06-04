"use client"

import { TripBox } from "./TripBox"

interface GridProps {}
export function Accepted() {
  const handleSelectTrip = (trip: any) => {}
  return (
    <TripBox onSelectTrip={handleSelectTrip} trips={[]} selectedTrip={null} />
  )
}
