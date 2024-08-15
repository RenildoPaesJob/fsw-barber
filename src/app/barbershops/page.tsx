import BarberShopItem from "@/_components/BarberShopItem"
import { db } from "@/_lib/prisma"
import Header from "@/_components/Header"
import Search from "@/_components/Search"


interface BarbershopPageProps {
	searchParams: {
		service?: string
		title?: string
	}
}

export default async function BarbershopPage({ searchParams }: BarbershopPageProps) {

	const barbershops = await db.barbershop.findMany({
		where: {
			OR: [
				searchParams?.title
					? {
						name: {
							contains: searchParams?.title,
							mode: "insensitive"
						}
					}
					:
					{},
				searchParams?.service ?
				{
					services: {
						some: {
							name: {
								contains: searchParams?.service,
								mode: "insensitive"
							}
						}
					}
				} :
				{}
			]
		}
	})

	return (
		<>
			<Header />

			<div className="my-6 px-5">
				<Search />
			</div>

			<div className="px-5">
				<h2
					className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400"
				>
					Resultados para &quot;{searchParams?.title || searchParams?.service}&quot;
				</h2>

				<div className="grid grid-cols-2 gap-2 mb-4">
					{
						barbershops?.map(barbershop => (
							<BarberShopItem key={barbershop.id} barbershop={barbershop} />
						))
					}
				</div>
			</div>
		</>
	)
}