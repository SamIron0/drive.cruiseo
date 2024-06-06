import { Tables } from "@/supabase/types"
import { Destination, Trip } from "@/types"
import { Dispatch, SetStateAction, createContext } from "react"
interface CruiseoContext {
  acceptedTrip: Trip | null
  setAcceptedTrip: Dispatch<SetStateAction<Trip | null>>
  destinations: Destination[] | null
  setDestinations: Dispatch<SetStateAction<Destination[] | null>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  activeCategory: string
  setActiveCategory: Dispatch<SetStateAction<string>>
  profile: Tables<"profiles"> | null
  setProfile: Dispatch<SetStateAction<Tables<"profiles"> | null>>
}

export const CruiseoContext = createContext<CruiseoContext>({
  acceptedTrip: null,
  setAcceptedTrip: () => {},
  destinations: [],
  setDestinations: () => {},
  searchInput: "",
  setSearchInput: () => {},
  activeCategory: "",
  setActiveCategory: () => {},
  profile: null,
  setProfile: () => {}
})
