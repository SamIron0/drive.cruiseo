// TODO: Separate into multiple contexts, keeping simple for now

"use client"
import { CruiseoContext } from "@/context/context"
import { getProfileByUserId } from "@/db/profile"
import { supabase } from "@/lib/supabase/browser-client"
import { Tables } from "@/supabase/types"
import { Destination, Trip } from "@/types"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface GlobalStateProps {
  children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({
  children
}: GlobalStateProps) => {
  const router = useRouter()
  // PROFILE STORE
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null)
  const [driver, setDriver] = useState<Tables<"drivers"> | null>(null)
  const [destinations, setDestinations] = useState<Destination[] | null>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [trip, setTrip] = useState<Trip | null>(null)
  const [acceptedTrips, setAcceptedTrips] = useState<Tables<"trips"> | null>(null)

  useEffect(() => {
    ;(async () => {
      const profile = await fetchStartingData()
    })()
  }, [])

  const fetchStartingData = async () => {
    const session = (await supabase.auth.getSession()).data.session

    if (session) {
      const user = session.user

      const profile = await getProfileByUserId(user.id)

      if (!profile.has_onboarded) {
        return router.push("/setup")
      } else {
       // const driver = await getDriverByUserId(user.id)
       //setDriver(profile)
      }
      setProfile(profile)

      return profile
    }
  }

  return (
    <CruiseoContext.Provider
      value={{
        acceptedTrips,
        setAcceptedTrips,
        profile,
        setProfile,
        destinations,
        setDestinations,
        searchInput,
        setSearchInput,
        activeCategory,
        setActiveCategory
      }}
    >
      {children}
    </CruiseoContext.Provider>
  )
}
