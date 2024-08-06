import Image from "next/image"

import { SearchIcon } from "lucide-react"

import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"

import Banner01 from "../../public/assets/img/Banner01.svg"

import Header from "./_components/Header"
import { Avatar, AvatarImage } from "./_components/ui/avatar"

export default function Home() {
	return (
		<>
			{/* Header */}
			<Header />

			{/* Boa vindas e busca */}
			<div className="p-5">
				<div className="text-xl font-bold">Olá, Renildo!</div>
				<p>Segunda-feira, 05 de agosto.</p>

				<div className="flex items-center gap-2 mt-6">
					<Input placeholder="Faça sua busca..." />
					<Button>
						<SearchIcon />
					</Button>
				</div>

				<div className="relative w-full h-[150px] mt-6">
					<Image
						alt="Banner Agende nos melhores com FWS Barber"
						src={Banner01} fill className="object-cover rounded-xl"
					/>
				</div>

				<Card className="mt-6">
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
		</>
	)
}