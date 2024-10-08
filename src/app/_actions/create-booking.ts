"use server"

import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
	serviceId: string
	date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
	const user = await getServerSession(authOptions)

	if (!user) {
		throw new Error("usuário não autenticado!")
	}

	await db.booking.create({
		data: { ...params, userId: (user.user as any).id, createdAt: new Date()},
	})
	revalidatePath("/barbershops/[id]")
}