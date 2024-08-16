import type { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet"
import { SheetTrigger } from "@/_components/ui/sheet"

import Maps from "../../../public/assets/img/maps.svg"
import Image from "next/image"

interface BookingItemProps {
	booking: Prisma.BookingGetPayload<{
		include: {
			service: {
				include: {
					barbershop: true
				}
			}
		}
	}>
}

export default function BookingItem({ booking }: BookingItemProps) {
	const isConfirmed = isFuture(booking.date)

	return (
		<Sheet>
			<SheetTrigger className="w-full">
				<Card className="min-w-[90%]">
					<CardContent className="flex justify-between px-5 py-0">
						{/* ESQUERDA */}
						<div className="flex flex-col gap-2 py-5">
							<Badge
								className="flex justify-center text-center w-fit m-0"
								variant={isConfirmed ? "default" : "secondary"}
							>
								{isConfirmed ? "Confirmado" : "Finalizado"}
							</Badge>
							<h3 className="font-bold">{booking?.service?.name}</h3>

							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage
										src={booking.service.barbershop.imageUrl}
										alt={booking.service.barbershop.name}
										className="object-cover"
									/>
								</Avatar>
								<h4>{booking?.service?.barbershop?.name}</h4>
							</div>
						</div>

						<div className="flex flex-col items-center justify-center border-l-2 border-solid pl-5">
							<p className="text-sm capitalize">
								{format(booking.date, "MMMM", { locale: ptBR })}
							</p>
							<p className="text-2xl">
								{format(booking.date, "dd", { locale: ptBR })}
							</p>
							<p className="text-sm">
								{format(booking.date, "HH:mm", { locale: ptBR })}
							</p>
						</div>
					</CardContent>
				</Card>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="text-left">Informações da Reserva</SheetHeader>

				<div className="p-5">
					<div className="relative">
						<Image src={Maps} alt="Map" fill className="object-cover" />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}