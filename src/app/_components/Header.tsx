import Image from "next/image"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

import Logo from "../../../public/assets/img/Logo.png"

export default function Header() {
	return (
		<Card>
			<CardContent className="flex flex-row items-center p-5 justify-between align-middle">
				<Image alt="logo FSW Barber" width={130} height={22} src={Logo} />
				<Button size="icon" variant="outline">
					<MenuIcon />
				</Button>
			</CardContent>
		</Card>
	)
}