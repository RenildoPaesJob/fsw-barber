import Image from "next/image"

import Banner01 from "../../public/assets/img/Banner01.svg"

import Header from "./_components/Header"
import { db } from "./_lib/prisma"
import Filters from "./_components/Filters"
import BookingItem from "./_components/BookingItem"
import Recommended from "./_components/Recommended"
import Search from "./_components/Search"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {

	const session = await getServerSession(authOptions)

	const barbershops = await db.barbershop.findMany({})
	const popularBarbershops = await db.barbershop.findMany({
		orderBy: {
			name: "desc"
		}
	})

	const concludedBookings = session?.user ? await db.booking.findMany({
		where: {
			userId: (session?.user as any).id,
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
	}) : []

	return (
		<>
			{/* Header */}
			<Header />

			<div className="p-5">
				{/* Boa vindas e busca */}
				<div className="text-xl font-bold">Olá, { session?.user?.name }!</div>
				<p>Segunda-feira, 05 de agosto.</p>

				{/* PESQUISA */}
				<div className="mt-6">
					<Search />
				</div>

				{/* FILTROS */}
				<Filters />

				{/* BANNER 01 */}
				<div className="relative w-full h-[150px] mt-6">
					<Image
						alt="Banner Agende nos melhores com FWS Barber"
						src={Banner01} fill className="object-cover rounded-xl"
					/>
				</div>

				{/* AGENDAMENTOS */}
				<div className="mt-5">
					<h2 className="text-xs font-bold uppercase text-gray-400 mb-3">
						Agendamentos
					</h2>
					<div className="flex overflow-x-auto w-full gap-3 [&::-webkit-scrollbar]:hidden">
						{
							concludedBookings.map(booking => (
								<BookingItem
									key={booking.id}
									booking={booking}
								/>
							))
						}
					</div>
				</div>

				{/* RECOMENDADOS */}
				<Recommended barbershops={barbershops} title="Recomendados" />

				{/* POPULARES */}
				<Recommended barbershops={popularBarbershops} title="Populares" />
			</div>
		</>
	)
}