import { RegisterForm } from "@/components/register-form"
import { get } from '@vercel/edge-config';

export default async function Page() {
    const isRegistrationOpen = await get('registration');
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