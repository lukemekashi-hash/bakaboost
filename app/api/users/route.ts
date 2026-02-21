import { hash } from "bcryptjs"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@/app/auth"

export async function POST(req: Request) {
    try {
        const session = await auth()

        // Check if user is authenticated
        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        const { name, email, password } = await req.json()

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await hash(password, 12)

        // Create user
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json(
            {
                user: {
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Create user error:", error)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
} 