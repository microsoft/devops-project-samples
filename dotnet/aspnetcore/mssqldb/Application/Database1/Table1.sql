if not exists (select * from sysobjects where name='accessLogs' and xtype='U')
CREATE TABLE accessLogs
(
ID_column INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
   PageName  nvarchar(128)     not null, 
    [AccessDate]  DATETIME NOT NULL DEFAULT GETUTCDATE() 
)
go