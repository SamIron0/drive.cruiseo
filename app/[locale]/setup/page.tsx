"use client"

import { CruiseoContext } from "@/context/context"
import { getProfileByUserId, updateProfile } from "@/db/profile"

import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { FinishStep } from "../../../components/setup/finish-step"
import { ProfileStep } from "../../../components/setup/profile-step"
import {
  SETUP_STEP_COUNT,
  StepContainer
} from "../../../components/setup/step-container"
import { v4 as uuid } from "uuid"
export default function SetupPage() {
  const { profile, setProfile, driver, setDriver } = useContext(CruiseoContext)

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [currentStep, setCurrentStep] = useState(1)

  // Profile Step
  const [username, setUsername] = useState(profile?.username || "")
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [phone, setPhone] = useState("")

  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (!session) {
        return router.push("/login")
      } else {
        const user = session.user

        const profile = await getProfileByUserId(user.id)
        setProfile(profile)
        setUsername(profile.username)

        if (!profile.has_onboarded) {
          setLoading(false)
        } else {
          return router.push(`/`)
        }
      }
    })()
  }, [])

  const handleShouldProceed = (proceed: boolean) => {
    if (proceed) {
      if (currentStep === SETUP_STEP_COUNT) {
        handleSaveSetupSetting()
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveSetupSetting = async () => {
    const session = (await supabase.auth.getSession()).data.session
    if (!session) {
      return router.push("/login")
    }

    const user = session.user
    const profile = await getProfileByUserId(user.id)
    const updateProfilePayload: TablesUpdate<"profiles"> = {
      ...profile,

      has_onboarded: true,
      username,
      phone
    }
    const updatedProfile = await updateProfile(profile.id, updateProfilePayload)
    //create new driver profile
    const driver: TablesInsert<"drivers"> = {
      id: user.id,
      rating: 5
    }
    const driverProfile = await fetch("/api/createDriverProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(driver)
    })

    if (!driverProfile.ok) {
      return
    }

    const driverProfileData = await driverProfile.json()
    setDriver(driverProfileData)

    // updaate local and db settings
    setProfile(updatedProfile)

    return router.push(`/`)
  }

  const renderStep = (stepNum: number) => {
    switch (stepNum) {
      // Profile Step
      case 1:
        return (
          <StepContainer
            stepDescription="Let's create your profile."
            stepNum={currentStep}
            stepTitle="Welcome to Cruiseo"
            onShouldProceed={handleShouldProceed}
            showNextButton={!!(username && phone.length == 10)}
            showBackButton={false}
          >
            <ProfileStep
              username={username}
              onUsernameChange={setUsername}
              phone={phone}
              onPhoneChange={setPhone}
            />
          </StepContainer>
        )

      // API Step

      case 2:
        return (
          <StepContainer
            stepDescription="You are all set up!"
            stepNum={currentStep}
            stepTitle="Setup Complete"
            onShouldProceed={handleShouldProceed}
            showNextButton={true}
            showBackButton={true}
          >
            <FinishStep username={username} />
          </StepContainer>
        )

      default:
        return null
    }
  }

  if (loading) {
    return null
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {renderStep(currentStep)}
    </div>
  )
}
