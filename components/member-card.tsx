import React from "react";
import { MoveHorizontalIcon } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function MemberCard() {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage src="/placeholder-user.jpg" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">John Doe</div>
					<div className="text-sm text-muted-foreground">
						Joined 2 weeks ago
					</div>
				</div>
			</div>
			<Button variant="ghost" size="icon">
				<MoveHorizontalIcon className="w-4 h-4" />
				<span className="sr-only">More options</span>
			</Button>
		</div>
	);
}
