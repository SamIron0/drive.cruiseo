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
        const available_res = await fetch("/api/availabletrips", {
          method: "GET"
        })
        const accepted_res = await fetch("/api/getAcceptedTrips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ driver_id: driver?.id })
        })
        const accepted_data = await accepted_res.json()
        !accepted_data.error ? setAcceptedTrips(accepted_data) : null

        const available_data = await available_res.json()

        console.log("new data", available_res)

        !available_data.error ? setAvailableTrips(available_data) : null
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const fetchStartingData = async () => {
    const session = (await supabase.auth.getSession()).data.session

    if (session) {
      const user = session.user

      const profile = await getProfileByUserId(user.id)
      const driver = await getDriverByUserId(user.id)
      if (!profile.has_onboarded) {
        return router.push("/setup")
      }
      setProfile(profile)
      setDriver(driver)

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
