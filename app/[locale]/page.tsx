"use client"

import Navbar from "@/components/navbar/NavBar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  return <div className="flex flex-col w-full items-center max-w-3xl">
    <p> Welcome back, Samuel 👋</p>
<span className="text-xl w-full justify-end">Pending: 0</span>
<span className="text-xl w-full justify-end">Payout: 0</span>

  </div>
}
