CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`songId` varchar(100) NOT NULL,
	`userId` int,
	`userName` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`approved` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageType` varchar(50) NOT NULL,
	`pageId` varchar(100),
	`source` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `song_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`songId` varchar(100) NOT NULL,
	`songTitle` varchar(255) NOT NULL,
	`views` int NOT NULL DEFAULT 0,
	`likes` int NOT NULL DEFAULT 0,
	`shares` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `song_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `song_stats_songId_unique` UNIQUE(`songId`)
);
