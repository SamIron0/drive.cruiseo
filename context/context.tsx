import { Tables } from "@/supabase/types"
import { Dispatch, SetStateAction, createContext } from "react"
interface CruiseoContext {
  acceptedTrips: Tables<"trips">[]
  setAcceptedTrips: Dispatch<SetStateAction<Tables<"trips">[]>>
  availableTrips: Tables<"trips">[]
  setAvailableTrips: Dispatch<SetStateAction<Tables<"trips">[]>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  activeCategory: string
  setActiveCategory: Dispatch<SetStateAction<string>>
  profile: Tables<"profiles"> | null
  setProfile: Dispatch<SetStateAction<Tables<"profiles"> | null>>
  driver: Tables<"drivers"> | null
  setDriver: Dispatch<SetStateAction<Tables<"drivers"> | null>>
}

export const CruiseoContext = createContext<CruiseoContext>({
  acceptedTrips: [],
  setAcceptedTrips: () => {},
  availableTrips: [],
  setAvailableTrips: () => {},
  searchInput: "",
  setSearchInput: () => {},
  activeCategory: "",
  setActiveCategory: () => {},
  profile: null,
  setProfile: () => {},
  driver: null,
  setDriver: () => {}
})
