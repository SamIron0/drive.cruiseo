import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs"
import { NextApiHandler } from "next"
import {
  createDriverProfile,
  getAcceptedTrips,
  getAvailableTrips
} from "@/db/admin"
import { cookies } from "next/headers"
import { Database, TablesInsert } from "@/supabase/types"

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json()
      const driver = body.driver
      // Extract the id from the request body
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

      const trips = await createDriverProfile(JSON.parse(driver))
      return new Response(JSON.stringify(trips), {
        status: 200
      })
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } })
      )
    }
  } else {
    return new Response(JSON.stringify("Method Not Allowed"))
  }
}
