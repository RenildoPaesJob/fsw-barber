import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// TODO: receber agendamento como props
export default function Booking() {
	return (
		<div className="flex flex-col gap-3 mt-6">
			<h2 className="text-xs font-bold uppercase text-gray-400">
				Agendamentos
			</h2>
			<Card>
				<CardContent className="flex justify-between px-5 py-0">
					{/* ESQUERDA */}
					<div className="flex flex-col gap-2 py-5">
						<Badge className="flex justify-center text-center w-fit">Confirmado</Badge>
						<h3 className="font-bold">Corte de Cabelo</h3>

						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarImage src="https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png" alt="@shadcn" className="object-cover" />
							</Avatar>
							<h4>Renildo P.</h4>
						</div>
					</div>

					<div className="flex flex-col items-center justify-center border-l-2 border-solid pl-5">
						<p className="text-sm">Agosto</p>
						<p className="text-2xl">06</p>
						<p className="text-sm">15:00</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}