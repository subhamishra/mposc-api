use `cms_dev`;

DROP TABLE IF EXISTS `appuser`;

CREATE TABLE `appuser` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `createdByUserId` int(11) DEFAULT NULL,
  `modifiedByUserId` int(11) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `secretKey` varchar(255) DEFAULT NULL,
  `secretKeyGeneratedAt` bigint(20) DEFAULT NULL,
  `secretKeyUsed` tinyint(1) DEFAULT NULL,
  `caseId` int(11) DEFAULT NULL,
  `points` int(20) DEFAULT 0,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

ALTER TABLE `lookup` ADD `points` int(10) DEFAULT NULL;