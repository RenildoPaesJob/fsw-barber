import type { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { formartCurrencyBR } from "../_lib/utils"
import { Card, CardContent } from "./ui/card"

interface ServicesItemProps {
	service: BarbershopService
}

export default function ServicesItem({ service }: ServicesItemProps) {
	return (
		<Card>
			<CardContent className="flex p-4 align-middle justify-center items-center">
				<div className="flex items-center gap-3 w-full">
					{/* IMAGEM */}
					<div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
						<Image
							src={service.imageUrl}
							alt={service.name}
							fill
							className="object-cover rounded-md"
						/>
					</div>

					{/* SERVIÇO */}
					<div className="flex flex-col gap-2 w-full">
						<h3 className="font-semibold">{service.name}</h3>
						<p className="text-sm text-gray-400">{service.description}</p>

						<div className="flex justify-between items-center">
							<p className="text-primary">
								{formartCurrencyBR(Number(service.price))}
							</p>
							<Button size="sm">Reservar</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}