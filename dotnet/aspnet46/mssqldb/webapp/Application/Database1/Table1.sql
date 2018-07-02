CREATE TABLE accessLogs
(
ID_column INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
   PageName  nvarchar(128)     not null, 
    [AccessDate]  DATETIME NOT NULL DEFAULT GETUTCDATE() 
);
