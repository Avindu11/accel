ALTER TABLE `lead_notes` DROP FOREIGN KEY `lead_notes_lead_id_leads_id_fk`;
--> statement-breakpoint
ALTER TABLE `lead_notes` ADD CONSTRAINT `lead_notes_lead_id_leads_id_fk` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE cascade ON UPDATE cascade;