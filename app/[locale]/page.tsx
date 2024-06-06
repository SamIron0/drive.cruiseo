"use client"
import { CruiseoContext } from "@/context/context"
import { redirect, useRouter } from "next/navigation"
import { useContext } from "react"

export default function Home() {
  const router = useRouter()
  const { profile } = useContext(CruiseoContext)
  if (!profile?.has_onboarded) {
    router.push("/setup")
    return
  }
  redirect("/dashboard")}
