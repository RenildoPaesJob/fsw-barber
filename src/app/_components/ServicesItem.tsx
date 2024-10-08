"use client"

import { useSession } from "next-auth/react"

import type { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { formartCurrencyBR } from "@/_lib/utils"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/_components/ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { toast } from "sonner"
import { createBooking } from "@/_actions/create-booking"
import { getBookings } from "@/_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SingInDialog from "./SignInDialog"

interface ServicesItemProps {
	service: BarbershopService
	barbershop: Pick<Barbershop, "name">
}

const TIME_LIST: string[] = [
	"08:00", "08:30",
	"09:00", "09:30",
	"10:00", "10:30",
	"11:00", "11:30",
	"12:00", "12:30",
	"13:00", "13:30",
	"14:00", "14:30",
	"15:00", "15:30",
	"16:00", "16:30",
	"17:00", "17:30",
	"18:00", "18:30",
	"19:00", "19:30",
]

const getTimeList = (bookings: Booking[]) => {
	return TIME_LIST.filter(time => {
		const hour = Number(time.split(":")[0])
		const minute = Number(time.split(":")[1])

		const hasBookingOnCurrentTime = bookings.some(
			(booking) =>
				booking.date.getHours() === hour &&
				booking.date.getMinutes() === minute
		)

		if (hasBookingOnCurrentTime) {
			return false
		} else {
			return true
		}
	})
}

export default function ServicesItem({ service, barbershop }: ServicesItemProps) {

	const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
	const { data } = useSession()
	const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
	const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
	const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState<boolean>(false)

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDay(date)
	}

	const handleTimeSelect = (time: string) => {
		setSelectedTime(time)
	}

	const handleBookingSheetIsOpenChange = () => {
		setSelectedDay(undefined)
		setSelectedTime(undefined)
		setDayBookings([])
		setBookingSheetIsOpen(false)
	}

	const handleCreateBooking = () => {
		try {
			if (!selectedDay || !selectedTime) return

			const hour = Number(selectedTime.split(":")[0])
			const minute = Number(selectedTime.split(":")[1])

			const newDate = set(selectedDay, {
				minutes: minute,
				hours: hour
			})

			createBooking({
				serviceId: service.id,
				date: newDate
			})

			toast.success("Reserva criada com sucesso!")
			handleBookingSheetIsOpenChange()
		} catch (err) {
			console.log(err)
			toast.error("Erro ao criar reserva!")
		}
	}

	const [dayBookings, setDayBookings] = useState<Booking[]>([])

	useEffect(() => {
		const fetch = async () => {
			if (!selectedDay) return

			const booking = await getBookings({
				date: selectedDay,
				serviceId: service.id
			})

			setDayBookings(booking)
		}

		fetch()
	}, [selectedDay, service.id])

	const handleBookingClick = () => {
		if(data?.user){
			return setBookingSheetIsOpen(true)
		}
		return setSignInDialogIsOpen(true)
	}

	return (
		<>
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

								<Sheet
									open={bookingSheetIsOpen}
									onOpenChange={handleBookingSheetIsOpenChange}
								>
									<Button size="sm" onClick={handleBookingClick}>Reservar</Button>

									<SheetContent className="px-0">
										<SheetHeader>
											<SheetTitle>Fazer Reserva</SheetTitle>
										</SheetHeader>

										<div className="py-5 border-b-2 border-solid">
											<Calendar
												mode="single"
												locale={ptBR}
												selected={selectedDay}
												onSelect={handleDateSelect}
												fromDate={new Date()}
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

										{
											selectedDay && (
												<div className=" border-b-2 border-solid">
													<h2 className="text-xs font-bold uppercase mt-5 px-3">
														Horários Disponíveis
													</h2>
													<div className="flex p-5 overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
														{
															getTimeList(dayBookings).map(time => (
																<Button
																	key={time}
																	variant={selectedTime === time ? "default" : "outline"}
																	className="rounded-full"
																	onClick={() => handleTimeSelect(time)}
																>
																	{time}
																</Button>
															))
														}
													</div>
												</div>
											)
										}

										{
											selectedTime && selectedDay && (
												<div className="p-5 border-b-2 border-solid">
													<Card>
														<CardContent className="p-3 space-y-3">
															<div className="flex items-center justify-between">
																<h2 className="font-bold">{service.name}</h2>
																<p className="text-sm font-bold">
																	{Intl.NumberFormat("pt-BR", {
																		style: "currency", currency: "BRL"
																	}).format(Number(service.price))}
																</p>
															</div>

															<div className="flex items-center justify-between">
																<h2 className="font-bold">Data</h2>
																<p className="text-sm font-bold text-gray-400">
																	{format(selectedDay, "d 'de' MMMM", {
																		locale: ptBR,
																	})}
																</p>
															</div>

															<div className="flex items-center justify-between">
																<h2 className="font-bold">Horário</h2>
																<p className="text-sm font-bold text-gray-400">
																	{selectedTime}
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
												</div>
											)
										}

										<SheetFooter className="px-5 mt-4">
											<SheetClose asChild>
												<Button
													onClick={handleCreateBooking}
													disabled={!selectedTime || !selectedDay}
												>
													Confirmar
												</Button>
											</SheetClose>
										</SheetFooter>
									</SheetContent>
								</Sheet>

							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Dialog
				open={signInDialogIsOpen}
				onOpenChange={(open) => {setSignInDialogIsOpen(open)}}
			>
				<DialogContent className="w-[90%]">
					<SingInDialog />
				</DialogContent>
			</Dialog>
		</>
	)
}