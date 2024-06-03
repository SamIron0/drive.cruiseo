import { Tables } from "@/supabase/types"
import { Destination, Trip } from "@/types"
import { Dispatch, SetStateAction, createContext } from "react"
interface CruiseoContext {
  selectedTrip:Tables<"usertrips"> | null
  setSelectedTrip: Dispatch<SetStateAction<Tables<"usertrips"> | null>>
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
  selectedTrip: null,
  setSelectedTrip: () => {
    
  },
  destinations: [],
  setDestinations: () => {},
  searchInput: "",
  setSearchInput: () => {},
  activeCategory: "",
  setActiveCategory: () => {},
  profile: null,
  setProfile: () => {}
})
