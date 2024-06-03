"use client"
import Container from "./Container"
import ClientOnly from "./ClientOnly"
import { useContext, useEffect } from "react"
import { CruiseoContext } from "@/context/context"
import { getProfileByUserId } from "@/db/profile"
import { supabase } from "@/lib/supabase/browser-client"

function editDistance(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const d = new Array(m + 1)

  for (let i = 0; i <= m; i++) {
    d[i] = new Array(n + 1)
    d[i][0] = i
  }

  for (let j = 0; j <= n; j++) {
    d[0][j] = j
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      )
    }
  }

  return d[m][n]
}
interface GridProps {}
export function Grid() {
  
  return (<></>)
}
