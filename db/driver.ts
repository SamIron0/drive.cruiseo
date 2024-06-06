import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
export const createDriverProfile = async (driver: TablesInsert<"drivers">) => {
  const { data: createdDriver, error } = await supabase
    .from("drivers")
    .insert(driver)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return createdDriver
}

export const getDriverByUserId = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", userId)
    .single()

  if (!profile) {
    throw new Error(error.message)
  }

  return profile
}
