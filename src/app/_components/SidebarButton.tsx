"use client"

import Link from "next/link"
import Image from "next/image"

import {
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle
} from "./ui/sheet"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { quickSearchOption } from "../_types/quickSearchOptions"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

import GoogleIcon from "../../../public/assets/img/google_icon_solid.svg"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

export default function SidebarButton() {

	const { data } = useSession()

	const handleLoginWithGoogleClick = () => signIn("google")

	return (
		<SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
			<SheetHeader>
				<SheetTitle className="text-left">Menu</SheetTitle>
			</SheetHeader>

			{/* AVATAR */}
			<div className="py-5 border-b border-solid flex justify-between items-center">
				{
					data?.user ? (
						<div className="flex gap-4">
							<div className="w-10 h-10">
								<Avatar>
									<AvatarImage
										alt={data?.user?.name ?? ""}
										src={data?.user?.image ?? ""}
										className="object-cover rounded-full"
									/>
								</Avatar>
							</div>

							<div className="flex flex-col p-0">
								<p className="text-xs">{data?.user?.name ?? ""}</p>
								<p className="text-xs text-gray-400">{data?.user?.email ?? ""}</p>
							</div>
						</div>
					) : (
						<>
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

									<Button
										variant="outline"
										className="flex gap-2 font-bold"
										onClick={handleLoginWithGoogleClick}
									>
										<Image src={GoogleIcon} alt="Fazer login com o google" />
										Google
									</Button>
								</DialogContent>
							</Dialog>
						</>
					)
				}

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
							asChild
						>
							<Link href={`/barbershops?service=${option.title}`} >
								<Image alt={option.title} src={option.imageUrl} height={18} width={18} />
								{option.title}
							</Link>
						</Button>
					))
				}
			</div>

			{/* LOGOUT */}
			{
				data?.user ?
					<>
						<div className="flex flex-col gap-2 py-5">
							<Button
								variant="ghost"
								className="flex gap-2"
								onClick={() => signOut()}
							>
								<LogOutIcon />
								Sair da conta
							</Button>
						</div>
					</> :
					""
			}
		</SheetContent>
	)
}