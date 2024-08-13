"use client"

import type { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { formartCurrencyBR } from "../_lib/utils"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"
import { SheetTrigger } from "@/app/_components/ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

interface ServicesItemProps {
	service: BarbershopService
}

export default function ServicesItem({ service }: ServicesItemProps) {

	const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDay(date)
	}

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

							<Sheet>
								<SheetTrigger asChild>
									<Button size="sm">Reservar</Button>
								</SheetTrigger>

								<SheetContent>
									<SheetHeader>
										<SheetTitle>Fazer Reserva</SheetTitle>
									</SheetHeader>

									<div className="py-5">
										<Calendar
											mode="single"
											locale={ptBR}
											selected={selectedDay}
											onSelect={handleDateSelect}
											styles={{
												head_cell: {
													width: "100%",
													textTransform: "capitalize"
												},
												cell: {
													width: "100%"
												},
												button: {
													width: "100%"
												},
												nav_button_previous: {
													width: "32px",
													height: "32px"
												},
												nav_button_next: {
													width: "32px",
													height: "32px"
												},
												caption: {
													textTransform: "capitalize"
												}
											}}
										/>
									</div>
								</SheetContent>
							</Sheet>

						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}