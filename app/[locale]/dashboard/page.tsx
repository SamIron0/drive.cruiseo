"use client"
import { Accepted } from "@/components/Accepted"
import { Available } from "@/components/Available"
import Categories from "@/components/navbar/Categories"
import Navbar from "@/components/navbar/NavBar"
import { Button } from "@/components/ui/button"
import { CruiseoContext } from "@/context/context"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { getProfileByUserId } from "@/db/profile"

export default function Home() {
  const router = useRouter()
  const {
    profile,
    setProfile,
    activeCategory,
    setAcceptedTrips,
    setAvailableTrips
  } = useContext(CruiseoContext)
  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (!session?.user?.id) {
        router.push("/login")
        return
      }
      if (!profile) {
        const prof = await getProfileByUserId(session?.user?.id)
        setProfile(prof)
      }
      const available_res = await fetch("/api/availabletrips", {
        method: "GET"
      })
      const accepted_res = await fetch("/api/getAcceptedTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ driver_id: session?.user?.id })
      })
      const accepted_data = await accepted_res.json()
      !accepted_data.error ? setAcceptedTrips(accepted_data) : null

      const available_data = await available_res.json()

      // console.log("new data", available_res)

      !available_data.error ? setAvailableTrips(available_data) : null
    })()
  }, [])

  return (
    <div className="flex flex-col w-full items-center ">
      <Navbar />

      <div className="mt-24 flex flex-col w-full p-4 items-center max-w-3xl">
        <p className="flex text-3xl w-full">
          {" "}
          Welcome back,{profile?.display_name} 👋
        </p>
        <span className="flex text-xl w-full justify-end">Pending: 0</span>
        <span className="text-xl flex mb-6 w-full justify-end">Payout: 0</span>

        <Categories />
        {activeCategory === "Available" ? <Available /> : <Accepted />}
      </div>
    </div>
  )
}
