import { Barbershop } from "@prisma/client"

import Image from "next/image"

import { StarIcon } from "lucide-react"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface BarberShopItemProps {
	barbershop: Barbershop
}

export default function BarberShopItem({ barbershop }: BarberShopItemProps) {
	return <>
		<Card className="min-w-[256px] rounded-xl">
			<CardContent className="p-2">
				{/* IMAGEM */}
				<div className="relative h-[159px] w-full">
					<Image
						alt="Image Barbershop"
						src={barbershop.imageUrl}
						fill
						className="object-cover rounded-xl"
					/>

					<Badge className="absolute left-2 top-2 gap-x-1" variant="secondary">
						<StarIcon size={12} className="fill-primary text-primary" />
						<p>5.0</p>
					</Badge>
				</div>

				{/* TEXTO */}
				<div>
					<h3 className="font-semibold truncate">{barbershop.name}</h3>
					<p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
					<Button variant="secondary" className="mt-3 w-full">Reservar</Button>
				</div>
			</CardContent>
		</Card>
	</>
}