"use client"
import Container from "./Container"
import ClientOnly from "./ClientOnly"
import { useContext, useEffect } from "react"
import { CruiseoContext } from "@/context/context"
import { getProfileByUserId } from "@/db/profile"
import { supabase } from "@/lib/supabase/browser-client"


interface GridProps {}
export function Accepted() {
  
  return (<></>)
}
