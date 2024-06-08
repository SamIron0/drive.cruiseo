import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getDriverByUserId = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) {
    return null
  }

  return profile
}

export const has_onboarded = async (driverId: string) => {
  const { data: driver, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", driverId)
    .single()

  if (error) {
    console.error("Error retrieving trips:", error)
    return null
  }
  return driver.has_onboarded
}
