"use client"

import type { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetContent, SheetFooter, SheetHeader } from "./ui/sheet"
import { SheetTrigger } from "@/_components/ui/sheet"

import IMaps from "../../../public/assets/img/maps.png"
import Image from "next/image"
import PhoneItem from "./PhoneItem"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@/_components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { deleteBooking } from "@/_actions/delete-booking"
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

	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const isConfirmed = isFuture(booking.date)
	const { service: { barbershop } } = booking
	const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }
	const handleCancelBooking = async () => {
		try {
			await deleteBooking(booking.id)
			setIsSheetOpen(false)
			toast.success("Reserva cancelada com sucesso")
		} catch (error) {
			console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
		}
	}

	return (
		<Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
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

				<div className="py-5">
					<div className="relative flex h-[180px] w-full items-end justify-center">
						<Image src={IMaps} alt="Map" className="object-cover" />

						<Card className="flex absolute items-center justify-center w-[95%] my-2">
							<CardContent className="flex items-center gap-3 py-3 px-5">
								<Avatar>
									<AvatarImage
										src={barbershop.imageUrl}
										alt={barbershop.name}
										className="object-cover"
									/>
								</Avatar>
								<div>
									<h3>{barbershop?.name}</h3>
									<p className="text-xs">{barbershop.address}</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<Badge
					className="flex justify-center text-center w-fit m-0"
					variant={isConfirmed ? "default" : "secondary"}
				>
					{isConfirmed ? "Confirmado" : "Finalizado"}
				</Badge>

				<div className="py-5 border-b-2 border-solid">
					<Card>
						<CardContent className="p-3 space-y-3">
							<div className="flex items-center justify-between">
								<h2 className="font-bold">{booking?.service.name}</h2>
								<p className="text-sm font-bold">
									{Intl.NumberFormat("pt-BR", {
										style: "currency", currency: "BRL"
									}).format(Number(booking?.service.price))}
								</p>
							</div>

							<div className="flex items-center justify-between">
								<h2 className="font-bold">Data</h2>
								<p className="text-sm font-bold text-gray-400">
									{format(booking?.date, "d 'de' MMMM", {
										locale: ptBR,
									})}
								</p>
							</div>

							<div className="flex items-center justify-between">
								<h2 className="font-bold">Horário</h2>
								<p className="text-sm font-bold text-gray-400">
									{format(booking?.date, "HH:mm", {
										locale: ptBR,
									})}
								</p>
							</div>

							<div className="flex items-center justify-between">
								<h2 className="font-bold">Barbearia</h2>
								<p className="text-sm font-bold text-gray-400 truncate">
									{barbershop.name}
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-3 mt-5">
						{
							barbershop.phones.map((phone, index) => (
								<PhoneItem phone={phone} key={index} />
							))
						}
					</div>
				</div>

				<SheetFooter className="flex flex-row gap-4 py-5 bottom-1">

					<Button className="w-full" variant="secondary">Voltar</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full">Cancelar Reserva</Button>
						</DialogTrigger>

						<DialogContent className="w-[90%] rounded-md">
							<DialogHeader>
								<DialogTitle>Cancelar Reserva</DialogTitle>
							</DialogHeader>

							<DialogDescription className="text-gray-400 text-center">Tem certeza que deseja cancelar esse agendamento?</DialogDescription>

							<DialogFooter className="flex flex-row gap-3">
								<DialogClose asChild>
									<Button
										className="w-full"
										variant="secondary"
									>
										Voltar
									</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button
										className="w-full"
										variant="destructive"
										onClick={handleCancelBooking}
									>
										Confirmar
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</SheetFooter>

			</SheetContent>
		</Sheet>
	)
}