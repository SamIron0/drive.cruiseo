import { Tables } from "@/supabase/types"
import { Destination, Trip } from "@/types"
import { Dispatch, SetStateAction, createContext } from "react"
interface CruiseoContext {
  availableTrips: Tables<"trips">[] | null
  setAvailableTrips: Dispatch<SetStateAction<Tables<"trips">[] | null>>
  acceptedTrips: Tables<"trips">[] | null
  setAcceptedTrips: Dispatch<SetStateAction<Tables<"trips">[] | null>>
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
  availableTrips: null,
  setAvailableTrips: () => {},
  acceptedTrips: null,
  setAcceptedTrips: () => {},
  destinations: [],
  setDestinations: () => {},
  searchInput: "",
  setSearchInput: () => {},
  activeCategory: "",
  setActiveCategory: () => {},
  profile: null,
  setProfile: () => {}
})
