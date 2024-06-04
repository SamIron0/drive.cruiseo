"use client"

import { Accepted } from "@/components/Accepted"
import { Available } from "@/components/Available"
import Categories from "@/components/navbar/Categories"
import Navbar from "@/components/navbar/NavBar"
import { Button } from "@/components/ui/button"
import { CruiseoContext } from "@/context/context"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useContext } from "react"

export default async function ChatPage() {
  const { activeCategory } = useContext(CruiseoContext)
  return (
    <div className="flex flex-col w-full p-4 items-center max-w-3xl">
      <p className="flex text-3xl w-full"> Welcome back, Samuel 👋</p>
      <span className="flex text-xl w-full justify-end">Pending: 0</span>
      <span className="text-xl flex mb-6 w-full justify-end">Payout: 0</span>

      <Categories />
      {activeCategory === "Available" ? <Available /> : <Accepted />}
    </div>
  )
}
