import { NewUserForm } from "@/components/new-user-form"

export default function Page() {
    return (
        <div className="mx-auto container max-w-2xl py-6 lg:py-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Create New User</h1>
                <p className="text-muted-foreground">
                    Create a new user account. The user will be able to log in with these credentials.
                </p>
                <NewUserForm />
            </div>
        </div>
    )
} 