USE [PawPanion];
GO

set identity_insert [User] on
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (1, 'J2cSHO1UB5V9bHascob2kOCQkyD3', 'Sonny Bradford', 'sonny@allcreatures.com', '8663370606', 'https://www.safarivet.com/wp-content/uploads/2019/04/Sergio_Franco.jpg', '1');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (2, 'iLwSZ6bjH1cEX1RP731YpucVDq33', 'Michaela Summers', 'msummers@allcreatures.com', '8663078525', 'https://www.lsu.edu/vetmed/images/headshots/gill_nimar.jpg', '1');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (3, 'c9GkMHeu27di9WYzV7DRYTW4TwI3', 'Rebekah Grandey', 'rebekahtdesigns@gmail.com', '9316071234', 'https://pasteboard.co/j4zj9fFqAdc6.png', '0');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (4, 'LVnmq6h5I3O6ANa2V2Tt0x1RF4c2', 'Eileen Jones', 'eileenjones@gmail.com', '8663053667', 'https://static.vecteezy.com/system/resources/thumbnails/003/492/047/small/closeup-portrait-of-a-charming-girl-over-blue-studio-background-image-free-photo.jpg', '0');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (5, 'z8OtkoZuYMRTYigOqZmwCa0G2Zj1', 'Kellye Perry', 'kperry@charter.net', '9317430412', 'https://wp.dailybruin.com/images/2020/08/web.ae_.katyperry.courtesy-128x128.jpg', '0');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (6, 'MoKLbuMewLdwtYyCGzzoybQS4Lk1', 'John Walker', 'jwalker@allcreatures.com', '8665489055', null, '1');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (7, 'ZvherFg8pKRmZm4vOYFcXxYM32F2', 'Greg Thomas', 'mrgreg83@hotmail.com', '6153345351', null, '0');
insert into [User] ([Id], FirebaseUserId, [Name], Email, Phone, ImageLocation, isVet) values (8, 'e325QlaRsTamAc8NT5Fpyhpg0aW2', 'Anahi Miranda', 'anahimir@gmail.com', '6156579925', null, '0');
set identity_insert [User] off

set identity_insert [Pet] on
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (1, 'Annie', 'Ragdoll/mix', '0', '2016-05-05', 3, '0', 'https://www.dropbox.com/s/kkroxqyd1mynfhs/Annie.jpg?raw=1');
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (2, 'Lottie', 'Britney/Cocker Spaniel', '0', '2022-11-30', 3, '1', 'https://www.dropbox.com/s/ltnvs4w3nl44efd/Lottie.jpg?raw=1');
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (3, 'Banjo', 'Mountain Cur', '1', '2020-09-01', 4, '1', 'https://www.dogbreedslist.info/uploads/dog-pictures/mountain-cur-2.jpg');
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (4, 'Luna', 'mixed breed', '0', '2015-06-16', 7, '1', null);
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (5, 'Baby Cat', 'Tortie mix', '0', '2019-11-10', 5, '0', null);
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (6, 'Milo', 'Chihuahua mix', '1', '2017-02-23', 7, '1', null);
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (7, 'Eden', 'Calico mix', '0', '2013-04-19', 5, '0', null);
insert into [Pet] ([Id], [Name], Breed, IsMale, Birthdate, OwnerId, IsDog, ImageLocation) values (8, 'Pepsi', 'Black Persian mix', '0', '2009-03-14', 5, '0', null);
set identity_insert [Pet] off

set identity_insert [RecordType] on
insert into [RecordType] ([Id], [Name]) values (1, 'Routine Checkup');
insert into [RecordType] ([Id], [Name]) values (2, 'Vaccination');
insert into [RecordType] ([Id], [Name]) values (3, 'Surgery');
insert into [RecordType] ([Id], [Name]) values (4, 'Treatment');
insert into [RecordType] ([Id], [Name]) values (5, 'Other');
set identity_insert [RecordType] off

set identity_insert [Record] on
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (1, 1, 1, 1, '2016-06-07 14:00:00', 3, 'Revolution Plus Topical Solution for Cats, 2.8-5.5 lbs', 'Ear mites, fleas', null, 'Mild case of ear mites and fleas. Apply Revolution once a month for three months. Squeeze the tube 3 or 4 times to empty on to the skin in one spot. Do not massage into the skin.');
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (2, 2, 3, 1, '2019-02-12 13:00:00', 9, null, null, 'Purina One Puppy Food - 1/2 cup three times a day', 'First round of dewormer(StrongIdT) Next round in approximately two weeks');
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (3, 2, 3, 1, '2019-02-20 13:30:00', 10.9, null, null, null, 'Second round of dewormer(StrongIdT) Next round in approximately two weeks. Distemper, Hepatitus, and Parainfluenza administered. Will administer Parvovirus vaccine at next visit.');
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (4, 1, 1, 2, '2019-02-22 10:00:00', 8.8, null, null, null, 'Routine checkup normal vitals.');
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (5, 2, 3, 1, '2019-03-04 11:30:00', 13.7, null, null, null, 'Third round of dewormer(StrongIdT) Final. Parvovirus vaccine administered.');
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (6, 4, 3, 2, '2019-09-03 08:30:00', 20.4, 'NexGuard Chewable', null, null, 'NexGuard Chewable 3 pills once/month.');
insert into Record ([Id], RecordTypeId, PetId, VetId, Date, Weight, Medication, Illness, Diet, Note) values (7, 1, 3, 2, '2020-09-28 08:00:00', 31.2, null, null, null, 'Routine checkup normal vitals.');
set identity_insert [Record] off

set identity_insert [ToDo] on
insert into [ToDo] ([Id], OwnerId, PetId, Message, DueDate, isComplete) values (1, 7, 4, 'Buy clicker for training', '2023-02-18 10:00:00', '0');
insert into [ToDo] ([Id], OwnerId, PetId, Message, DueDate, isComplete) values (2, 3, 2, 'Do walk-in for nail trim before they close', '2023-02-20 15:00:00', '0');
set identity_insert [ToDo] off

set identity_insert [Appointment] on
insert into [Appointment] ([Id], PetId, VetId, Date, ReasonForVisit) values (1, 5, 6, '2023-03-13 08:00:00', 'Rabies vaccination');
insert into [Appointment] ([Id], PetId, VetId, Date, ReasonForVisit) values (2, 2, 2, '2023-03-15 10:30:00', 'Dewormer round 4');
set identity_insert [Appointment] off