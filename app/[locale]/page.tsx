"use client"

import Categories from "@/components/navbar/Categories"
import Navbar from "@/components/navbar/NavBar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  return (
    <div className="flex flex-col w-full p-4 items-center max-w-3xl">
      <p className="flex text-3xl w-full"> Welcome back, Samuel 👋</p>
      <span className="flex text-xl w-full justify-end">Pending: 0</span>
      <span className="text-xl flex  w-full justify-end">Payout: 0</span>

      <Categories />
    </div>
  )
}
