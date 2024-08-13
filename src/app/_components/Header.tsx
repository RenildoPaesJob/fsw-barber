import Image from "next/image"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

import Logo from "../../../public/assets/img/Logo.png"

import {
	Sheet,
	SheetTrigger
} from "./ui/sheet"
import SidebarButton from "./SidebarButton"
import Link from "next/link"

export default function Header() {
	return (
		<Card>
			<CardContent className="flex flex-row items-center p-5 justify-between align-middle">
				<Link href="/">
					<Image alt="logo FSW Barber" width={130} height={22} src={Logo} />
				</Link>

				{/* SIDEBAR */}
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" variant="outline">
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SidebarButton />
				</Sheet>
			</CardContent>
		</Card>
	)
}