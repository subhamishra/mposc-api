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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `appuseractivity`;

CREATE TABLE `appuseractivity` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `createdByUserId` int(11) DEFAULT NULL,
  `modifiedByUserId` int(11) DEFAULT NULL,
  `appuserActivityId` int(11) NOT NULL AUTO_INCREMENT,
  `appUserId` int(11) NOT NULL,
  `pointsRedeemed` int(20) DEFAULT 0,
  `pointsReceived` int(20) DEFAULT 0,
  `appuserBalancePoints` int(20),
  `scopeId` int(11) DEFAULT NULL,
  `activityTypeId` int(11) NOT NULL, -- it is the lookup id for ActivityType lookup type
  PRIMARY KEY (`appuserActivityId`),
  UNIQUE KEY `appuserActivityId` (`appuserActivityId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `videoId` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `sourceUrl` VARCHAR(255) NOT NULL,
  `thumbnailUrl` VARCHAR(255) NOT NULL,
  `points` int(20) DEFAULT 0,
  `quizPoints` int(20) DEFAULT 0,
  PRIMARY KEY (`videoId`),
  UNIQUE KEY `videoId` (`videoId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `quizquestions`;

CREATE TABLE `quizquestions` (
  `quizquestionsId` INT(11) NOT NULL AUTO_INCREMENT,
  `videoId` INT(11) NOT NULL,
  `question` VARCHAR(255) NOT NULL,
  `options` VARCHAR(1000) NOT NULL,
  `correctAnswerIndex` INT(2) NOT NULL,
  PRIMARY KEY (`quizquestionsId`),
  UNIQUE KEY `quizquestionsId` (`quizquestionsId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
`cartId` int NOT NULL AUTO_INCREMENT,
`userId` int DEFAULT NULL,
`lookupId` int DEFAULT NULL,
`iswishlist` tinyint DEFAULT NULL,
`quantity` int DEFAULT NULL,
`status` int(11) DEFAULT NULL,
PRIMARY KEY (`cartId`),
UNIQUE KEY `cartId_UNIQUE` (`cartId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;



ALTER TABLE `lookup` ADD `points` int(10) DEFAULT NULL;

ALTER TABLE caseappointment
ADD caseContactId int(11) DEFAULT NULL;

ALTER TABLE casecontact
ADD organisation varchar(255);

ALTER TABLE casecontact
ADD email varchar(255);

ALTER TABLE lookup CHANGE COLUMN customStringValue customStringValue VARCHAR(1000);
