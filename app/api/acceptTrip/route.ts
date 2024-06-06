import { acceptTrip } from "@/db/admin"
import { Database } from "@/supabase/types"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const supabase = createRouteHandlerClient<Database>({ cookies })
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) {
        return new Response(
          JSON.stringify({
            error: "not authenticated",
            description:
              "The user does not have an active session or is not authenticated"
          }),
          { status: 500 }
        )
      }

      const body = await req.json()
      const trip = body.trip
      const driver = body.driver
      const res = await acceptTrip(trip.id, driver)

      return new Response(JSON.stringify(res), { status: 200 })
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      )
    }
  }
}
