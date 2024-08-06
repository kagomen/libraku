CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text,
	`publisher` text,
	`sales_date` text,
	`price` text,
	`image_url` text,
	`isbn` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_isbn_unique` ON `books` (`isbn`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/