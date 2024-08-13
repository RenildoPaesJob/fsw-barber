"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "./ui/form"

const searchFormSchema = z.object({
	search: z.string().trim().min(1, {
		message: "Digite algo para buscar!"
	})
})

export default function Search() {

	const iSearchFormShema = useForm<z.infer<typeof searchFormSchema>>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			search: ""
		}
	})

	const router = useRouter()

	const handleSubmit = (data: z.infer<typeof searchFormSchema>) => {
		router.push(`/barbershops?search=${data.search}`)
	}

	return (
		<Form {...iSearchFormShema}>
			<form
				onSubmit={iSearchFormShema.handleSubmit(handleSubmit)}
				className="flex gap-2"
			>
				<FormField
					control={iSearchFormShema.control}
					name="search"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input placeholder="Faça sua busca..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
				>
					<SearchIcon />
				</Button>

			</form>
		</Form>
	)
}