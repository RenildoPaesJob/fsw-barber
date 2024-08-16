
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

	const confirmedBookings = await db.booking.findMany({
		where: {
			userId: (session.user as any).id,
			date: {
				gte: new Date()
			}
		},
		include: {
			service: {
				include: {
					barbershop: true
				}
			}
		},
		orderBy: {
			date: "asc"
		}
	})

	const concludedBookings = await db.booking.findMany({
		where: {
			userId: (session.user as any).id,
			date: {
				lt: new Date()
			}
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
				<h1 className="text-xl font-bold mb-3">Agendamentos</h1>

				<h2 className="text-xs font-bold uppercase text-gray-400 mb-3">
					Confirmados
				</h2>

				<div className="space-y-3 mb-3">
					{
						confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
					}
				</div>

				<h2 className="text-xs font-bold uppercase text-gray-400 mb-3">
					Finalizados
				</h2>

				<div className="space-y-3">
					{
						concludedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
					}
				</div>
			</div>
		</>
	)
}