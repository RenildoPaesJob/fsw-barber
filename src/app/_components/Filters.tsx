import Image from "next/image"

import { Button } from "./ui/button"
import { quickSearchOption } from "@/_types/quickSearchOptions"
import Link from "next/link"

export default function Filters() {
	return (
		<div className="flex gap-3 mt-6 overflow-auto [&::-webkit-scrollbar]:hidden">
			{
				quickSearchOption.map(option =>
					<Button
						key={option.title}
						className="gap-2"
						variant="secondary"
						asChild
					>
						<Link href={`/barbershops?service=${option.title}`} >
							<Image
								alt={option.title}
								src={option.imageUrl}
								height={16}
								width={16}
							/>
							{option.title}
						</Link>
					</Button>
				)
			}
		</div>
	)
}