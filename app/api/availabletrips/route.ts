import {
  createRouteHandlerClient,
  createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs"
import { NextApiHandler } from "next"
import { getAvailableTrips } from "@/db/admin"
import { cookies } from "next/headers"
import { Database, TablesInsert } from "@/supabase/types"
import { has_onboarded } from "@/db/driver"

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
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
      if (!has_onboarded(session.user.id)) {
        return new Response(
          JSON.stringify({
            error: "not authenticated",
            description: "The user has not been onboarded"
          }),
          { status: 500 }
        )
      }

      const trips = await getAvailableTrips()
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
