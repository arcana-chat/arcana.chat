CREATE TABLE `ChatSession` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Message` (
	`id` text PRIMARY KEY NOT NULL,
	`sessionId` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`sessionId`) REFERENCES `ChatSession`(`id`) ON UPDATE no action ON DELETE no action
);
