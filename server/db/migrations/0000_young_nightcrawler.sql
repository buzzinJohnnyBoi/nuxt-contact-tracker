CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`birth_date` datetime,
	`email` varchar(255),
	`phone` varchar(255),
	`address` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact-notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contact_id` int NOT NULL,
	`note` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact-notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contact-notes` ADD CONSTRAINT `contact-notes_contact_id_contacts_id_fk` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE no action ON UPDATE no action;