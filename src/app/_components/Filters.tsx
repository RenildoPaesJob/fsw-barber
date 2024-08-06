import Image from "next/image"

import { Button } from "./ui/button"

import Tesoura from "../../../public/assets/img/tesoura_solid_icon.svg"
import Bigode from "../../../public/assets/img/bigode_solid_icon.svg"
import Navalha from "../../../public/assets/img/navalha_solid_icon.svg"

export default function Filters() {
	return (
		<div className="flex gap-3 mt-6 overflow-auto [&::-webkit-scrollbar]:hidden">
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Tesoura}
					height={16}
					width={16}
				/>
				Cabelo
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Bigode}
					height={16}
					width={16}
				/>
				Barba
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Navalha}
					height={16}
					width={16}
				/>
				Acabamento
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Tesoura}
					height={16}
					width={16}
				/>
				Cabelo
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Bigode}
					height={16}
					width={16}
				/>
				Barba
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Navalha}
					height={16}
					width={16}
				/>
				Acabamento
			</Button>
		</div>
	)
}