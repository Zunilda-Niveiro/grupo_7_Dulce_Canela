-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dulce_canela
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dulce_canela
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dulce_canela` DEFAULT CHARACTER SET utf8 ;
USE `dulce_canela` ;

-- -----------------------------------------------------
-- Table `dulce_canela`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`rols` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol_id` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKuserrol_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FKuserrol`
    FOREIGN KEY (`rol_id`)
    REFERENCES `dulce_canela`.`rols` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`avatars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`avatars` (
  `id` INT UNSIGNED NOT NULL,
  `file` VARCHAR(255) NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `Fkavatarsusers_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `Fkavatarsusers`
    FOREIGN KEY (`user_id`)
    REFERENCES `dulce_canela`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`categories` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`brands` (
  `int` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`int`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`products` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `detail` TEXT NULL,
  `amount` INT NOT NULL,
  `discount` INT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `brand_id` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FKproductscategory_idx` (`category_id` ASC) VISIBLE,
  INDEX `FKproductsbrand_idx` (`brand_id` ASC) VISIBLE,
  CONSTRAINT `FKproductscategory`
    FOREIGN KEY (`category_id`)
    REFERENCES `dulce_canela`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FKproductsbrand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `dulce_canela`.`brands` (`int`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`orders` (
  `id` INT UNSIGNED NOT NULL,
  `total` INT NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FKordersuser_idx` (`user_id` ASC) VISIBLE,
  INDEX `FKorderproduct_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKordersuser`
    FOREIGN KEY (`user_id`)
    REFERENCES `dulce_canela`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FKorderproduct`
    FOREIGN KEY (`product_id`)
    REFERENCES `dulce_canela`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`paymentmethods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`paymentmethods` (
  `id` INT UNSIGNED NOT NULL,
  `method` VARCHAR(255) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`carts` (
  `id` INT UNSIGNED NOT NULL,
  `order_id` INT UNSIGNED NOT NULL,
  `paymentmethod_id` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FKcartspayment_idx` (`paymentmethod_id` ASC) VISIBLE,
  INDEX `FKcartsorders_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `FKcartspayment`
    FOREIGN KEY (`paymentmethod_id`)
    REFERENCES `dulce_canela`.`paymentmethods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FKcartsorders`
    FOREIGN KEY (`order_id`)
    REFERENCES `dulce_canela`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dulce_canela`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dulce_canela`.`images` (
  `id` INT UNSIGNED NOT NULL,
  `file` VARCHAR(255) NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FKimagesproduct_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKimagesproduct`
    FOREIGN KEY (`product_id`)
    REFERENCES `dulce_canela`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
