// TODO: Separate into multiple contexts, keeping simple for now

"use client"
import { CruiseoContext } from "@/context/context"
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
  const [searchInput, setSearchInput] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("Available")
  const [availableTrips, setAvailableTrips] = useState<Tables<"trips">[]>([])
  const [acceptedTrips, setAcceptedTrips] = useState<Tables<"drivertrips">[]>([])
  useState<Tables<"drivertrips"> | null>(null)

  useEffect(() => {
    ;(async () => {
      const profile = await fetchStartingData()
      const res = await fetch("/api/availabletrips", { method: "GET" })
      const data = await res.json()
      console.log(data)

      !data.error ? setAvailableTrips(data) : null
    })()
  }, [])

  const fetchStartingData = async () => {
    const session = (await supabase.auth.getSession()).data.session

    if (session) {
      const user = session.user

      const profile = await getProfileByUserId(user.id)

      if (!profile.has_onboarded) {
        return router.push("/setup")
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
        availableTrips,
        setAvailableTrips,
        profile,
        setProfile,
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
