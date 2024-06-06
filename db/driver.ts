import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"


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
