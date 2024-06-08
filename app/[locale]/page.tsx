"use client"
import { CruiseoContext } from "@/context/context"
import {useRouter } from "next/navigation"
import { useContext } from "react"

export default function Home() {
  const router = useRouter()
  
  router.push("/dashboard")
}
