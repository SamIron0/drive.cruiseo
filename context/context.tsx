import { Tables } from "@/supabase/types"
import { Dispatch, SetStateAction, createContext } from "react"
interface CruiseoContext {
  availableTrips: Tables<"trips">[]
  setAvailableTrips: Dispatch<SetStateAction<Tables<"trips">[]>>
  selectedTrip: Tables<"drivertrips"> | null
  setSelectedTrip: Dispatch<SetStateAction<Tables<"drivertrips"> | null>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  activeCategory: string
  setActiveCategory: Dispatch<SetStateAction<string>>
  profile: Tables<"profiles"> | null
  setProfile: Dispatch<SetStateAction<Tables<"profiles"> | null>>
}

export const CruiseoContext = createContext<CruiseoContext>({
  selectedTrip: null,
  setSelectedTrip: () => {},
  availableTrips: [],
  setAvailableTrips: () => {},
  searchInput: "",
  setSearchInput: () => {},
  activeCategory: "",
  setActiveCategory: () => {},
  profile: null,
  setProfile: () => {}
})
