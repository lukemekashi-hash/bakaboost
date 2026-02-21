import { RegisterForm } from "@/components/register-form"

export const dynamic = "force-dynamic" // prevents build-time prerender issues

export default async function Page() {
  // Turn registration on/off using an env var
  // In Netlify set: REGISTRATION_OPEN=true (or false)
  const isRegistrationOpen = (process.env.REGISTRATION_OPEN ?? "true").toLowerCase() === "true"

  if (!isRegistrationOpen) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <p>Registration is closed</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}