"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function DashboardNav() {
	const { data: session, status } = useSession();
	if (status === "loading" || !session?.user) return null;
	return (
		<Button asChild variant="ghost">
			<Link href="/dashboard">Dashboard</Link>
		</Button>
	);
}
