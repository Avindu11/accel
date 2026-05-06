ALTER TABLE `admin` DROP FOREIGN KEY `admin_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `admin` ADD CONSTRAINT `admin_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;