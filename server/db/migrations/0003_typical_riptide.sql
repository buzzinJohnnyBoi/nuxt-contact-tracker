CREATE TABLE `contact-occupations` (
	`id` int NOT NULL,
	`contact_id` int NOT NULL,
	`occupation_id` int NOT NULL,
	CONSTRAINT `contact-occupations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `occupations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	CONSTRAINT `occupations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contact-occupations` ADD CONSTRAINT `contact-occupations_contact_id_contacts_id_fk` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contact-occupations` ADD CONSTRAINT `contact-occupations_occupation_id_occupations_id_fk` FOREIGN KEY (`occupation_id`) REFERENCES `occupations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contacts` DROP COLUMN `occupation`;