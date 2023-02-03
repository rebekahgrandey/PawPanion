USE [master]

IF db_id('PawPanion') IS NULl
  CREATE DATABASE [PawPanion]
GO

USE [PawPanion]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Pet];
DROP TABLE IF EXISTS [ToDo];
DROP TABLE IF EXISTS [Record];
DROP TABLE IF EXISTS [RecordType];
DROP TABLE IF EXISTS [Appointment];
GO


CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Phone] nvarchar(255),
  [ImageLocation] nvarchar(255),
  [IsVet] bit NOT NULL
)
GO

CREATE TABLE [Pet] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Breed] nvarchar(255) NOT NULL,
  [IsMale] bit NOT NULL,
  [Age] float NOT NULL,
  [OwnerId] int NOT NULL,
  [IsDog] bit NOT NULL,
  [ImageLocation] nvarchar(255)
)
GO

CREATE TABLE [ToDo] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [OwnerId] int NOT NULL,
  [PetId] int NOT NULL,
  [Message] nvarchar(255) NOT NULL,
  [DueDate] datetime,
  [IsComplete] bit NOT NULL
)
GO

CREATE TABLE [Record] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RecordTypeId] int NOT NULL,
  [PetId] int NOT NULL,
  [VetId] int NOT NULL,
  [Date] datetime NOT NULL,
  [Weight] float,
  [Medication] nvarchar(255),
  [Illness] nvarchar(255),
  [Diet] nvarchar(255),
  [Note] nvarchar(255)
)
GO

CREATE TABLE [RecordType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Appointment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PetId] int NOT NULL,
  [VetId] int NOT NULL,
  [Date] datetime NOT NULL,
  [ReasonForVisit] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Record] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Record] ADD FOREIGN KEY ([RecordTypeId]) REFERENCES [RecordType] ([Id])
GO

ALTER TABLE [Appointment] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Appointment] ADD FOREIGN KEY ([VetId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Record] ADD FOREIGN KEY ([VetId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [ToDo] ADD FOREIGN KEY ([OwnerId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [ToDo] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id]) ON DELETE CASCADE
GO
