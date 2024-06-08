// TODO: Separate into multiple contexts, keeping simple for now

"use client"
import { CruiseoContext } from "@/context/context"
import { getDriverByUserId } from "@/db/driver"
import { getProfileByUserId } from "@/db/profile"
import { supabase } from "@/lib/supabase/browser-client"
import { Tables } from "@/supabase/types"
import { redirect, useRouter } from "next/navigation"
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
  const [searchInput, setSearchInput] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("Available")
  const [availableTrips, setAvailableTrips] = useState<Tables<"trips">[]>([])
  const [acceptedTrips, setAcceptedTrips] = useState<Tables<"trips">[]>([])
  useState<Tables<"drivertrips"> | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const profile = await fetchStartingData()
        if (!profile?.has_onboarded) return
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const fetchStartingData = async () => {
    const session = (await supabase.auth.getSession()).data.session

    if (session) {
      const user = session.user
      if (!user) {
        router.push("/login")
        return
      }
      const profile = await getProfileByUserId(user.id)
      setProfile(profile)
      if (!profile.has_onboarded) {
        return router.push("/setup")
      }
      return profile
    }
  }
  return (
    <CruiseoContext.Provider
      value={{
        acceptedTrips,
        setAcceptedTrips,
        availableTrips,
        setAvailableTrips,
        profile,
        setProfile,
        driver,
        setDriver,
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
