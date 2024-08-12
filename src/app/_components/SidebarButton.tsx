import Link from "next/link"
import Image from "next/image"

import {
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle
} from "./ui/sheet"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon } from "lucide-react"
import { quickSearchOption } from "../_types/quickSearchOptions"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

import GoogleIcon from "../../../public/assets/img/google_icon_solid.svg"

export default function SidebarButton() {
	return (
		<SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
			<SheetHeader>
				<SheetTitle className="text-left">Menu</SheetTitle>
			</SheetHeader>

			{/* AVATAR */}
			<div className="py-5 border-b border-solid flex justify-between items-center gap-2">
				<h2 className="font-bold text-lg">Olá faça seu login!</h2>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="icon w-fit">
							<LogInIcon />
						</Button>
					</DialogTrigger>

					<DialogContent className="flex flex-col w-[90%]">
						<DialogHeader>
							<DialogTitle>Faça login na plataforma!</DialogTitle>
							<DialogDescription>
								Conecte-se usando sua conta do Google.
							</DialogDescription>
						</DialogHeader>

						<Button variant="outline" className="flex gap-2 font-bold">
							<Image src={GoogleIcon} alt="Fazer login com o google" />
							Google
						</Button>
					</DialogContent>

				</Dialog>
				{/* <div className="w-10 h-10">
					<Avatar>
						<AvatarImage
							alt="@shadcn"
							src="https://images.unsplash.com/photo-1706885093487-7eda37b48a60?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							className="object-cover rounded-full"
						/>
					</Avatar>
				</div>

				<div className="flex flex-col p-0">
					<p className="text-xs">Renildo P.</p>
					<p className="text-xs text-gray-400">renildop@gmail.com</p>
				</div> */}
			</div>

			<div className="flex flex-col gap-2 py-5 border-b-2">
				<SheetClose asChild>
					<Button className="justify-start gap-2 w-full" asChild variant="ghost">
						<Link href="/">
							<HomeIcon size={18} />
							Início
						</Link>
					</Button>
				</SheetClose>
				<Button
					variant="ghost"
					className="justify-start gap-2"
				>
					<CalendarIcon size={18} />
					Agendamentos
				</Button>
			</div>

			<div className="flex flex-col gap-2 py-5 border-b-2">
				{
					quickSearchOption.map(option => (
						<Button
							key={option.title}
							className="justify-start gap-2"
							variant="ghost"
						>
							<Image alt={option.title} src={option.imageUrl} height={18} width={18} />
							{option.title}
						</Button>
					))
				}
			</div>

			{/* LOGOUT */}
			{/* <div className="flex flex-col gap-2 py-5">
				<Button variant="ghost" className="flex gap-2">
					<LogOutIcon />
					Sair da conta
				</Button>
			</div> */}
		</SheetContent>
	)
}