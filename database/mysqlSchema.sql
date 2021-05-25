-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'roles'
--
-- ---

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` INTEGER AUTO_INCREMENT,
  `role` VARCHAR(60),
  `color` VARCHAR(60),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'employees'
--
-- ---

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(60),
  `phone` VARCHAR(10),
  `birthday` DATE,
  `password` VARCHAR(100),
  `start_date` DATE,
  `is_active` TINYINT DEFAULT 1,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'employee_roles'
--
-- ---

DROP TABLE IF EXISTS `employee_roles`;

CREATE TABLE `employee_roles` (
  `id` INTEGER AUTO_INCREMENT,
  `id_employee` INTEGER,
  `id_role` INTEGER,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'employee_schedule'
--
-- ---

DROP TABLE IF EXISTS `employee_schedule`;

CREATE TABLE `employee_schedule` (
  `id` INTEGER AUTO_INCREMENT,
  `datetime` DATETIME,
  `employee_role_one` INTEGER,
  `employee_role_two` INTEGER,
  `is_released` TINYINT,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'time_off'
--
-- ---

DROP TABLE IF EXISTS `time_off`;

CREATE TABLE `time_off` (
  `id` INTEGER AUTO_INCREMENT,
  `id_employee` INTEGER,
  `date` DATE,
  `morning` TINYINT,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'recurring_time_off'
--
-- ---

DROP TABLE IF EXISTS `recurring_time_off`;

CREATE TABLE `recurring_time_off`(
  `id` INTEGER AUTO_INCREMENT,
  `id_employee` INTEGER,
  `day` varchar(10),
  `morning` TINYINT,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'activity'
--
-- ---

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `id` INTEGER AUTO_INCREMENT,
  `shift` INTEGER,
  `time_of_activity` DATETIME,
  `type_of_activity` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `employee_roles` ADD FOREIGN KEY (id_employee) REFERENCES `employees` (`id`);
ALTER TABLE `employee_roles` ADD FOREIGN KEY (id_role) REFERENCES `roles` (`id`);
ALTER TABLE `employee_schedule` ADD FOREIGN KEY (employee_role) REFERENCES `employee_roles` (`id`);
ALTER TABLE `time_off` ADD FOREIGN KEY (id_employee) REFERENCES `employees` (`id`);
ALTER TABLE `activity` ADD FOREIGN KEY (shift) REFERENCES `employee_schedule` (`id`);
ALTER TABLE `employee_schedule` ADD FOREIGN KEY (employee_role_one) REFERENCES `employee_roles` (id);
ALTER TABLE `employee_schedule` ADD FOREIGN KEY (employee_role_two) REFERENCES `employee_roles` (id);
ALTER TABLE `recurring_time_off` ADD FOREIGN KEY (id_employee) REFERENCES `employees` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `roles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employees` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employee_roles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employee_schedule` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `time_off` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `activity` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `roles` (`id`,`role`,`color`) VALUES
-- ('','','');
-- INSERT INTO `employees` (`id`,`name`,`phone`,`birthday`,`password`,`startDate`) VALUES
-- ('','','','','','');
-- INSERT INTO `employee_roles` (`id`,`id_employee`,`id_role`) VALUES
-- ('','','');
-- INSERT INTO `employee_schedule` (`id`,`datetime`,`employee_role`,`is_released`) VALUES
-- ('','','','');
-- INSERT INTO `time_off` (`id`,`id_employee`,`date`,`morning`,`night`) VALUES
-- ('','','','','');
-- INSERT INTO `activity` (`id`,`shift`,`time_of_activity`,`type_of_activity`) VALUES
-- ('','','','');