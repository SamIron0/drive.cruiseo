import { createClient } from "@supabase/supabase-js"
import type { Database, Tables, TablesInsert } from "@/supabase/types"
import { v4 as uuid } from "uuid"
// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

export const getAvailableTrips = async () => {
  const { data: trips, error } = await supabaseAdmin
    .from("trips")
    .select("*")
    .eq("status", "pending")

  if (error) {
    console.error("Error retrieving trips:", error)
    return null
  }

  return trips
}
export const getAcceptedTrips = async (driverId: string) => {
  const { data: trips, error } = await supabaseAdmin
    .from("drivertrips")
    .select("*")
    .eq("driverId", driverId)

  if (error) {
    console.error("Error retrieving trips:", error)
    return null
  }

  return trips
}
export const acceptTrip = async (tripId: string, driverId: string) => {
  const { data: trip, error } = await supabaseAdmin
    .from("trips")
    .update({ id: tripId, status: "accepted" })
    .eq("id", tripId)

  if (error) {
    console.error("Error retrieving trips:", error)
    return null
  }

  const { data: driverTrip, error: driverTripError } = await supabaseAdmin
    .from("drivertrips")
    .insert({ id: uuid(), driver_id: driverId, trip_id: tripId })
    .select("*")

  if (driverTripError) {
    console.error("Error retrieving trips:", driverTripError)
    return null
  }

  return driverTrip
}

export const completeTrip = async (tripId: string) => {
  const { data: trip, error } = await supabaseAdmin
    .from("trips")
    .update({ id: tripId, status: "completed" })
    .eq("id", tripId)

  if (error) {
    console.error("Error completing trips:", error)
    return null
  }

  return trip
}
