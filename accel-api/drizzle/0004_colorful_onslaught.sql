ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;