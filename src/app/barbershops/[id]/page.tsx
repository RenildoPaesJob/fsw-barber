import ServicesItem from "@/app/_components/ServicesItem"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
	params: {
		id: string
	}
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
	//busca no banco pelo o id da barbearia
	const barbershop = await db.barbershop.findUnique({
		where: {
			id: params.id
		},
		include: {
			services: true
		}
	})

	if (!barbershop) return notFound()

	return (
		<>
			{/* IMAGEM BARBEARIA */}
			<div className="relative w-full h-[250px]">
				<Image
					alt={barbershop?.name ?? ""}
					src={barbershop?.imageUrl ?? ""}
					fill
					className="object-cover rounded-xl"
				/>

				<Button
					className="absolute left-4 top-4"
					size="icon"
					variant="secondary"
					asChild
				>
					<Link href="/">
						<ChevronLeftIcon />
					</Link>
				</Button>

				<Button
					className="absolute right-4 top-4"
					size="icon"
					variant="secondary"
				>
					<MenuIcon />
				</Button>
			</div>

			{/* INFORMAÇÕES BARBEARIA */}
			<div className="p-6 border-b-2 border-solid">
				<h1 className="text-xl font-bold mb-3">{barbershop?.name ?? ""}</h1>

				<div className="flex justify-between">
					<div className="flex items-center gap-1">
						<MapPinIcon className="text-primary" size={18} />
						<p className="text-sm">{barbershop?.address ?? ""}</p>
					</div>

					<div className="flex items-center gap-1">
						<StarIcon className="text-primary fill-primary" size={18} />
						<p className="text-sm">5,0 (499 avaliações)</p>
					</div>
				</div>
			</div>

			{/* SOBRE NÓS */}
			<div className="space-y-2 border-b-2 border-solid p-6">
				<h2 className="text-xs font-bold uppercase">
					Sobre nós
				</h2>
				<p className="text-sm text-justify text-gray-400">
					{barbershop?.description ?? ""}
				</p>
			</div>

			{/* SERVIÇOS */}
			<div className="p-5">
				<h2 className="text-xs font-bold uppercase mb-4">
					SERVIÇOS
				</h2>
				<div className="flex flex-col gap-6">
					{
						barbershop.services.map((service) => (
							<ServicesItem key={service.id} service={service} />
						))
					}
				</div>
			</div >
		</>
	)
}