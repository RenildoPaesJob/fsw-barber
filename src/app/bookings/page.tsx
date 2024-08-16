
import BookingItem from "@/_components/BookingItem"
import Header from "@/_components/Header"
import { authOptions } from "@/_lib/auth"
import { db } from "@/_lib/prisma"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

export default async function Bookings() {

	const session = await getServerSession(authOptions)

	if (!session?.user) {
		// TODO: mostrar pop-up de login
		return notFound()
	}

	const bookings = await db.booking.findMany({
		where: {
			userId: (session.user as any).id
		},
		include: {
			service: {
				include: {
					barbershop: true
				}
			}
		}
	})

	return (
		<>
			<Header />

			<div className="p-5">
				<h2 className="text-xs font-bold uppercase text-gray-400 mb-3">
					Agendamentos
				</h2>

				<div className="space-y-3">
					{
						bookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
					}
				</div>
			</div>
		</>
	)
}