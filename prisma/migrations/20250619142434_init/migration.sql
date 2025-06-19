-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `provider_account` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    UNIQUE INDEX `Account_provider_provider_account_key`(`provider`, `provider_account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_session_token_key`(`session_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    PRIMARY KEY (`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `height` DOUBLE NULL,
    `weight` DOUBLE NULL,
    `physical_activity` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `dislike_ingredients` VARCHAR(191) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `meal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `portion` DOUBLE NULL,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NULL,

    PRIMARY KEY (`meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMeal` (
    `email` VARCHAR(191) NOT NULL,
    `meal_id` INTEGER NOT NULL,

    PRIMARY KEY (`email`, `meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `recipe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `procedure` VARCHAR(191) NULL,
    `cooking_time` INTEGER NULL,
    `serving_count` INTEGER NULL,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`recipe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealRecipe` (
    `meal_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`meal_id`, `recipe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `ingredient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `storage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeIngredient` (
    `recipe_id` INTEGER NOT NULL,
    `ingredient_id` INTEGER NOT NULL,

    PRIMARY KEY (`recipe_id`, `ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NutritionInfo` (
    `nutrition_id` INTEGER NOT NULL AUTO_INCREMENT,
    `protein` DOUBLE NULL,
    `carbs` DOUBLE NULL,
    `fats` DOUBLE NULL,
    `calories` DOUBLE NULL,
    `fiber` DOUBLE NULL,
    `quantity` DOUBLE NULL,

    PRIMARY KEY (`nutrition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeInfo` (
    `recipe_id` INTEGER NOT NULL,
    `nutrition_id` INTEGER NOT NULL,

    UNIQUE INDEX `RecipeInfo_recipe_id_key`(`recipe_id`),
    UNIQUE INDEX `RecipeInfo_nutrition_id_key`(`nutrition_id`),
    PRIMARY KEY (`recipe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeType` (
    `recipe_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`recipe_id`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMeal` ADD CONSTRAINT `UserMeal_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMeal` ADD CONSTRAINT `UserMeal_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meal`(`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecipe` ADD CONSTRAINT `MealRecipe_meal_id_fkey` FOREIGN KEY (`meal_id`) REFERENCES `Meal`(`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealRecipe` ADD CONSTRAINT `MealRecipe_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredient`(`ingredient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInfo` ADD CONSTRAINT `RecipeInfo_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInfo` ADD CONSTRAINT `RecipeInfo_nutrition_id_fkey` FOREIGN KEY (`nutrition_id`) REFERENCES `NutritionInfo`(`nutrition_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeType` ADD CONSTRAINT `RecipeType_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipe`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;
