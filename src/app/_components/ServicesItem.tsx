import type { BarbershopService } from "@prisma/client"
import Image from "next/image"

interface ServicesItemProps {
	service: BarbershopService
}

export default function ServicesItem({ service }: ServicesItemProps) {
	return (
		<div className="flex items-center gap-3">
			<div className="relative h-[110px] w-[110px]">
				<Image
					src={service.imageUrl}
					alt={service.name}
					fill
					className="object-cover"
				/>
			</div>
		</div>
	)
}