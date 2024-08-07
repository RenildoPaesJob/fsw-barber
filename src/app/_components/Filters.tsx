import Image from "next/image"

import { Button } from "./ui/button"

import Tesoura from "../../../public/assets/img/tesoura_solid_icon.svg"
import Bigode from "../../../public/assets/img/bigode_solid_icon.svg"
import Navalha from "../../../public/assets/img/navalha_solid_icon.svg"
import Sobrancelha from "../../../public/assets/img/sobrancelha_solid_icon.svg"
import Toalha from "../../../public/assets/img/toalha_solid_icon.svg"
import Shampoo from "../../../public/assets/img/shampoo_solid_icon.svg"

interface QuickSearchOption {
	imageUrl: string
	title: string
}

const quickSearchOption: QuickSearchOption[] = [
	{
		imageUrl: Tesoura,
		title: "Cabelo"
	},
	{
		imageUrl: Bigode,
		title: "Barba"
	},
	{
		imageUrl: Navalha,
		title: "Acabamento"
	},
	{
		imageUrl: Sobrancelha,
		title: "Sobrancelha"
	},
	{
		imageUrl: Toalha,
		title: "Massagem"
	},
	{
		imageUrl: Shampoo,
		title: "Hidratação"
	}
]

export default function Filters() {
	return (
		<div className="flex gap-3 mt-6 overflow-auto [&::-webkit-scrollbar]:hidden">
			{
				quickSearchOption.map(option =>
					<Button key={option.title} className="gap-2" variant="secondary">
						<Image
							alt={option.title}
							src={option.imageUrl}
							height={16}
							width={16}
						/>
						{option.title}
					</Button>
				)
			}
		</div>
	)
}