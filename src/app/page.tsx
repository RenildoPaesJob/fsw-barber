import { SearchIcon } from "lucide-react"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

import Banner01 from "../../public/assets/img/Banner01.svg"

export default function Home() {
	return (
		<>
			<Header />

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
			</div>
		</>
	)
}