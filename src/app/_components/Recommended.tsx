import type { Barbershop } from "@prisma/client"

import BarberShopItem from "./BarberShopItem"

interface RecommendedProps {
	barbershops: Barbershop[]
	title: string
}

export default function Recommended({ barbershops, title }: RecommendedProps) {
	return (
		<div className="flex flex-col gap-3 mt-6">
			<h2 className="text-xs font-bold uppercase text-gray-400">
				{title}
			</h2>

			<div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
				{
					barbershops.map(barbershop =>
						<BarberShopItem key={barbershop.id} barbershop={barbershop} />
					)
				}
			</div>
		</div>
	)
}