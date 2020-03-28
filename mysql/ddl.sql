CREATE SCHEMA `tangpemo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;

CREATE TABLE `children_songs` (
   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `name` varchar(255)  NOT NULL COMMENT '名称',
   `adress` text NOT NULL COMMENT '地址',
   `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;