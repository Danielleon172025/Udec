USE [Udec]
GO
/****** Object:  Table [dbo].[BlackList]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlackList](
	[ListId] [int] IDENTITY(1,1) NOT NULL,
	[DeviceId] [int] NULL,
	[CreationDate] [datetime] NOT NULL,
	[Description] [varchar](200) NULL,
	[Active] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Devices]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Devices](
	[DeviceId] [int] IDENTITY(1,1) NOT NULL,
	[DeviceType] [int] NULL,
	[Serial] [varchar](255) NULL,
	[TradeMark] [varchar](255) NULL,
	[Model] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
	[RFID] [varchar](255) NULL,
	[isActive] [bit] NULL,
	[Imageid] [int] NULL,
 CONSTRAINT [PK_Devices] PRIMARY KEY CLUSTERED 
(
	[DeviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeviceTypes]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeviceTypes](
	[DeviceTypeId] [int] IDENTITY(1,1) NOT NULL,
	[DeviceType] [varchar](100) NULL,
 CONSTRAINT [PK_DeviceTypes] PRIMARY KEY CLUSTERED 
(
	[DeviceTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entrance]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entrance](
	[EntryId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[UserDeviceId] [int] NULL,
	[DateIN] [datetime] NULL,
	[DateOut] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventLog]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventLog](
	[EventLogId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](255) NULL,
	[SessionToken] [varchar](255) NULL,
	[Module] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
	[ClientIP] [varchar](255) NULL,
	[RegisterDate] [datetime] NULL,
	[EventUserId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Identification]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Identification](
	[IdentificationId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](200) NULL,
	[Description] [varchar](200) NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_Identification] PRIMARY KEY CLUSTERED 
(
	[IdentificationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[ImageId] [int] IDENTITY(1,1) NOT NULL,
	[FilePath] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InstitucionalInv]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InstitucionalInv](
	[InvId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[DeviceType] [int] NULL,
	[Serial] [varchar](255) NULL,
	[TradeMark] [varchar](255) NULL,
	[Model] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_InstitucionalInv] PRIMARY KEY CLUSTERED 
(
	[InvId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loads]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loads](
	[LoadId] [int] IDENTITY(1,1) NOT NULL,
	[InvId] [int] NULL,
	[UserId] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[isReturn] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modules]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modules](
	[ModuleId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Path] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
	[Enabled] [bit] NULL,
 CONSTRAINT [PK_Modules] PRIMARY KEY CLUSTERED 
(
	[ModuleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ModulesOptions]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ModulesOptions](
	[ModuleOptionId] [int] IDENTITY(1,1) NOT NULL,
	[ModuleId] [int] NULL,
	[OptionName] [varchar](255) NULL,
	[Path] [varchar](255) NULL,
 CONSTRAINT [PK_ModulesOptions] PRIMARY KEY CLUSTERED 
(
	[ModuleOptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notifications]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notifications](
	[NotificationId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Type] [int] NULL,
	[Message] [varchar](255) NULL,
	[CreationDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Penalties]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Penalties](
	[PenaltyId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Description] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Active] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profiles]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profiles](
	[IdProfile] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
	[CreationDate] [datetime] NULL,
	[Eliminated] [bit] NULL,
	[EliminationDate] [datetime] NULL,
 CONSTRAINT [PK_Profiles] PRIMARY KEY CLUSTERED 
(
	[IdProfile] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProfilesModules]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProfilesModules](
	[ProfilePermissionId] [int] IDENTITY(1,1) NOT NULL,
	[ProfileId] [int] NULL,
	[ModuleId] [int] NULL,
	[ModuleOptionId] [int] NULL,
	[Active] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Program]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Program](
	[ProgramId] [int] IDENTITY(1,1) NOT NULL,
	[Program] [varchar](200) NULL,
	[Description] [varchar](200) NULL,
	[SchoolId] [int] NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_Program] PRIMARY KEY CLUSTERED 
(
	[ProgramId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResourceDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResourceDevice](
	[ResourceDeviceId] [int] IDENTITY(1,1) NOT NULL,
	[ResourceId] [int] NULL,
	[DeviceId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Resources]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Resources](
	[ResourceId] [int] NULL,
	[Name] [varchar](255) NULL,
	[Type] [int] NULL,
	[Description] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoomDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoomDevice](
	[RoomDeviceId] [int] IDENTITY(1,1) NOT NULL,
	[RoomId] [int] NULL,
	[DeviceId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rooms]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rooms](
	[RoomId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Description] [varchar](255) NULL,
 CONSTRAINT [PK_Rooms] PRIMARY KEY CLUSTERED 
(
	[RoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schools]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schools](
	[SchoolId] [int] IDENTITY(1,1) NOT NULL,
	[School] [varchar](200) NULL,
	[Description] [varchar](200) NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_Schools] PRIMARY KEY CLUSTERED 
(
	[SchoolId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserDevices]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDevices](
	[UserDeviceId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[DeviceId] [int] NOT NULL,
	[AssignedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserDeviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[IdentificationId] [int] NOT NULL,
	[Identification] [varchar](50) NOT NULL,
	[Firstname] [varchar](255) NOT NULL,
	[Lastname] [varchar](255) NOT NULL,
	[Username] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[Imageid] [int] NULL,
	[Email] [varchar](255) NOT NULL,
	[Ldap] [bit] NULL,
	[IsActive] [bit] NULL,
	[createdDate] [datetime] NULL,
	[ProgramId] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersProfiles]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersProfiles](
	[UserProfileId] [int] IDENTITY(1,1) NOT NULL,
	[ProfileId] [int] NULL,
	[UserId] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserDevices] ADD  DEFAULT (getdate()) FOR [AssignedAt]
GO
ALTER TABLE [dbo].[BlackList]  WITH CHECK ADD  CONSTRAINT [FK_BlackList_Devices] FOREIGN KEY([DeviceId])
REFERENCES [dbo].[Devices] ([DeviceId])
GO
ALTER TABLE [dbo].[BlackList] CHECK CONSTRAINT [FK_BlackList_Devices]
GO
/****** Object:  StoredProcedure [dbo].[AssignUserToDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[AssignUserToDevice]
  @UserId INT,
  @DeviceId INT
AS
BEGIN
  SET NOCOUNT ON;

-- Validar si ya existe la asignación
IF NOT EXISTS (
    SELECT 1 FROM UserDevices WHERE DeviceId = @DeviceId
)
BEGIN
    INSERT INTO UserDevices (UserId, DeviceId)
    VALUES (@UserId, @DeviceId);
END
ELSE
BEGIN
    RAISERROR('Ya existe una asignación para este dispositivo.', 16, 1);
    RETURN;


    -- 🔐 Registro de log de asignación
    DECLARE @Username NVARCHAR(100);
    DECLARE @DeviceSerial NVARCHAR(100);
    DECLARE @DescriptionLog NVARCHAR(1000);

    -- Obtener datos de referencia
    SELECT @Username = Username FROM Users WHERE UserId = @UserId;
    SELECT @DeviceSerial = Serial FROM Devices WHERE DeviceId = @DeviceId;

    SET @DescriptionLog = CONCAT('Se asignó el dispositivo ', @DeviceSerial, ' al usuario ', @Username);

    EXEC [dbo].[LogEvento_Insert]
      @EventLogId = 0,
      @Username = @Username,
      @SessionToken = '',
      @Module = 'Dispositivos',
      @Description = @DescriptionLog,
      @ClientIp = '',
      @EventUserId = @UserId,
      @RegisterDate = NULL,
      @ExecutionStatus = NULL,
      @ExecutionMessage = NULL,
      @ProcedureStatus = NULL,
      @ProcedureMessage = NULL,
      @ProcedureValue = NULL;
  END
  END;
GO
/****** Object:  StoredProcedure [dbo].[Dashboard_ActivityChart]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[Dashboard_ActivityChart]
AS
BEGIN
    SELECT 
        CAST(E.DateIn AS DATE) AS [Date],
        COUNT(*) AS Count
    FROM Entrance E
    WHERE E.DateIn >= DATEADD(DAY, -7, GETDATE())
    GROUP BY CAST(E.DateIn AS DATE)
    ORDER BY [Date];
END;
GO
/****** Object:  StoredProcedure [dbo].[Dashboard_Counts]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[Dashboard_Counts]
AS
BEGIN
    SELECT
        (SELECT COUNT(*) FROM Users WHERE IsActive = 1) AS TotalUsers,
        (SELECT COUNT(*) FROM Devices WHERE IsActive = 1) AS TotalDevices,
        (SELECT COUNT(*) FROM Entrance WHERE DateIn IS NOT NULL) AS TotalEntries,
        (SELECT COUNT(*) FROM Penalties) AS TotalPenalties,
        (SELECT COUNT(*) FROM Profiles WHERE EliminationDate is null) AS TotalProfiles;
END;
GO
/****** Object:  StoredProcedure [dbo].[Dashboard_LogResumen]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Dashboard_LogResumen]
AS
BEGIN
    SELECT TOP 10
        EventLogId,
        Username,
        Module,
        Description,
        RegisterDate
    FROM EventLog where Module='Entradas'
    ORDER BY RegisterDate DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[Dashboard_RecentEntries]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[Dashboard_RecentEntries]
AS
BEGIN
    SELECT TOP 10
        E.EntryId,
        U.Firstname,
		u.Lastname,
        D.Serial,
        E.DateIn,
        E.DateOut
    FROM Entrance E
    INNER JOIN Users U ON U.UserId = E.UserId
	INNER JOIN UserDevices UD ON UD.UserDeviceId=E.UserDeviceId 
    INNER JOIN Devices D ON UD.DeviceId = D.DeviceId
    ORDER BY E.EntryId DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[DeactivateBlackList]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].DeactivateBlackList] para Eliminar un dispositivo en la lista negra de la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[DeactivateBlackList]
    @ListId INT
AS
BEGIN
    UPDATE BlackList
    SET Active = 0
    WHERE ListId = @ListId;
END;
GO
/****** Object:  StoredProcedure [dbo].[DeactivatePenalty]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20250114
-- Description: Creación del procedimiento [dbo].DeactivatePenalty] para Desactivar una penalidad para un usuario
	============================================*/
CREATE PROCEDURE [dbo].[DeactivatePenalty]
  @PenaltyId INT
AS
BEGIN
  UPDATE dbo.Penalties
  SET Active = 0
  WHERE PenaltyId = @PenaltyId;

  -- Confirmación de la desactivación
  PRINT 'Penalización desactivada correctamente';
END;





GO
/****** Object:  StoredProcedure [dbo].[DeleteProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[DeleteProfile] para inactivar perfiles de usuario  en la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[DeleteProfile]
  @IdProfile INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Validar si existe y no ha sido eliminado ya
  IF EXISTS (SELECT 1 FROM Profiles WHERE IdProfile = @IdProfile AND Eliminated = 0)
  BEGIN
    UPDATE Profiles
    SET 
      Eliminated = 1,
      EliminationDate = GETDATE()
    WHERE IdProfile = @IdProfile;

    -- Registrar en log
    DECLARE @ProfileName NVARCHAR(100);
    DECLARE @DescriptionLog NVARCHAR(1000);

    SELECT @ProfileName = Name FROM Profiles WHERE IdProfile = @IdProfile;

    SET @DescriptionLog = CONCAT('El perfil "', @ProfileName, '" ha sido marcado como eliminado.');

    EXEC [dbo].[LogEvento_Insert]
      @EventLogId = 0,
      @Username = '', -- puedes ajustar esto según el usuario real que ejecuta
      @SessionToken = '',
      @Module = 'Perfiles',
      @Description = @DescriptionLog,
      @ClientIp = '',
      @EventUserId = NULL, -- opcional: si tienes el ID del usuario que ejecuta
      @RegisterDate = NULL,
      @ExecutionStatus = NULL,
      @ExecutionMessage = NULL,
      @ProcedureStatus = NULL,
      @ProcedureMessage = NULL,
      @ProcedureValue = NULL;
  END
  ELSE
  BEGIN
    RAISERROR('El perfil no existe o ya ha sido eliminado.', 16, 1);
  END
END;
GO
/****** Object:  StoredProcedure [dbo].[DeleteProgram]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================
   Autor: Daniel Felipe Leon Higuera
   Fecha: 20250414
   Descripción: Procedimiento para eliminar un programa
============================================= */
CREATE   PROCEDURE [dbo].[DeleteProgram]
  @ProgramId INT
AS
BEGIN
  DECLARE @OldProgram VARCHAR(200);
  SELECT @OldProgram = Program FROM Program WHERE ProgramId = @ProgramId;

  UPDATE Program
  SET Active = 0
  WHERE ProgramId = @ProgramId;

  -- Log
  DECLARE @Username VARCHAR(100) = 'system';
  DECLARE @DescriptionLog VARCHAR(1000) = CONCAT('Se eliminó (lógicamente) el programa "', @OldProgram, '"');

  EXEC dbo.LogEvento_Insert
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Programas',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = NULL,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserFromProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteUserFromProfile]
    @UserId INT,
    @ProfileId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM UsersProfiles
    WHERE UserId = @UserId AND ProfileId = @ProfileId;

			Declare @DescriptionLog varchar (1000);
			Declare @Profilename varchar (100);
			Declare @Username varchar (100);

		    set @Username = (select Username from dbo.Users where @UserId=UserId); 
			set @Profilename = (select Name from dbo.Profiles where @ProfileId=IdProfile); 

	  				--DL:20250308 Se puede modificar el mensaje de la descripción aquí
				set @DescriptionLog = (select CONCAT('El Usuario : ',@Username,' Se le Retira el perfil ',@Profilename )); 


				--DL:20250308 Llamado al procedimiento para dejar el log
				EXEC [dbo].[LogEvento_Insert]
				@EventLogId = 0,
				@Username = @username,
				@SessionToken = '',
				@Module = 'Perfiles',
				@Description = @DescriptionLog,
				@ClientIp = '',
				@EventUserId=@UserId,
				@RegisterDate = null,
				@ExecutionStatus = null,
				@ExecutionMessage  = null,
				@ProcedureStatus = null,
				@ProcedureMessage = null,
				@ProcedureValue = null



END;

GO
/****** Object:  StoredProcedure [dbo].[DisableDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
Autor: Daniel Felipe Leon Higuera
Create date: 2024-12-28
Description: Inactiva un dispositivo en el sistema
            
============================================= */
CREATE PROCEDURE [dbo].[DisableDevice]
  @DeviceId INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Validar si existe y está activo
  IF EXISTS (SELECT 1 FROM dbo.Devices WHERE DeviceId = @DeviceId AND isActive = 1)
  BEGIN
    -- Inactivar el dispositivo
    UPDATE dbo.Devices
    SET isActive = 0
    WHERE DeviceId = @DeviceId;

    -- Registrar log
    DECLARE @Serial NVARCHAR(100);
    DECLARE @DescriptionLog NVARCHAR(1000);

    SELECT @Serial = Serial FROM dbo.Devices WHERE DeviceId = @DeviceId;

    SET @DescriptionLog = CONCAT('Se ha inactivado el dispositivo con serial "', @Serial, '".');

    EXEC [dbo].[LogEvento_Insert]
      @EventLogId = 0,
      @Username = '',  
      @SessionToken = '',
      @Module = 'Dispositivos',
      @Description = @DescriptionLog,
      @ClientIp = '',
      @EventUserId = NULL,
      @RegisterDate = NULL,
      @ExecutionStatus = NULL,
      @ExecutionMessage = NULL,
      @ProcedureStatus = NULL,
      @ProcedureMessage = NULL,
      @ProcedureValue = NULL;
  END
  ELSE
  BEGIN
    RAISERROR('El dispositivo no existe o ya está inactivo.', 16, 1);
  END
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllDeviceTypes]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
   -- Autor: Daniel Felipe Leon Higuera
   -- Create date: 20250414
   -- Description: Devuelve la lista de tipos de dispositivos registrados
=============================================*/
CREATE PROCEDURE [dbo].[GetAllDeviceTypes]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT DeviceTypeId, DeviceType
    FROM DeviceTypes;


END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllIdentifications]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllIdentifications]
AS
BEGIN
    SELECT IdentificationId, Name FROM Identification
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllProfiles]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllProfiles]
AS
BEGIN
    SELECT 
        IdProfile, 
        Name, 
        Description, 
        Eliminated AS IsActive
    FROM Profiles
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPrograms]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================
   Autor: Daniel Felipe Leon Higuera
   Fecha: 20250414
   Descripción: Obtener todos los programas activos
============================================= */
CREATE   PROCEDURE [dbo].[GetAllPrograms]
AS
BEGIN
  SELECT ProgramId, Program, Description, SchoolId, Active
  FROM Program
  WHERE Active = 1;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllUsers]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 2025012
-- Description: Creación del procedimiento [dbo].[GetAllUsers] para listar todos los Usuarios en la Herramienta
				*/
CREATE PROCEDURE [dbo].[GetAllUsers]
AS
BEGIN
    SELECT 
        u.UserId,
		u.IdentificationId,
		id.Name,
		u.Identification,
        u.Firstname,
        u.Lastname,
        u.Username,
        u.Email,
        u.IsActive,
        i.FilePath AS ImagePath,
		u.ProgramId
    FROM Users u
    LEFT JOIN Images i ON u.ImageId = i.ImageId
	INNER JOIN Identification id On u.IdentificationId= id.IdentificationId
    ORDER BY UserId;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllUsersFiltered]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllUsersFiltered]
    @Search NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

SELECT UserId, Username, Email
FROM Users
WHERE LOWER(Username) LIKE '%' + LOWER(@Search) + '%'
   OR LOWER(Email) LIKE '%' + LOWER(@Search) + '%'
    ORDER BY Username;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAssignedUsersByDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAssignedUsersByDevice]
    @DeviceId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT u.UserId, u.Username, u.Email
    FROM Users u
    INNER JOIN UserDevices ud ON ud.UserId = u.UserId
    WHERE ud.DeviceId = @DeviceId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetDeviceById]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* ===========================================================================================================
-- Autor: Daniel Felipe Leon Higuera
-- Fecha de creación: 2024-12-27
-- Descripción: Procedimiento para obtener la información de un dispositivo por su DeviceId, incluyendo la ruta de imagen.
=========================================================================================================== */

CREATE PROCEDURE [dbo].[GetDeviceById]
    @DeviceId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        D.DeviceId,
        D.DeviceType,
        D.Serial,
        D.TradeMark,
        D.Model,
        D.Description,
        D.RFID,
        I.FilePath AS ImagePath
    FROM Devices D
    LEFT JOIN Images I ON D.ImageId = I.ImageId
    WHERE D.DeviceId = @DeviceId;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetDevices]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetDevices]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        D.DeviceId,
        D.DeviceType,
        D.Serial,
        D.TradeMark,
        D.Model,
        D.Description,
        D.RFID,
        D.IsActive,
        I.FilePath 
    FROM dbo.Devices D
    LEFT JOIN dbo.Images I ON D.ImageId = I.ImageId
END;
GO
/****** Object:  StoredProcedure [dbo].[GetEventLog]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetEventLog]
    @Username NVARCHAR(100) = NULL,
    @Module NVARCHAR(100) = NULL,
    @StartDate DATETIME = NULL,
    @EndDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT EventLogId, Username, SessionToken, Module, Description, ClientIP, RegisterDate, EventUserId
    FROM EventLog
    WHERE 
        (@Username IS NULL OR Username = @Username)
        AND (@Module IS NULL OR Module = @Module)
        AND (@StartDate IS NULL OR RegisterDate >= @StartDate)
        AND (@EndDate IS NULL OR RegisterDate <= @EndDate)
    ORDER BY RegisterDate DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetProfilePermissions]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetProfilePermissions]    Script Date: 18/04/2025 1:32:16 a. m. ******/

CREATE PROCEDURE [dbo].[GetProfilePermissions]
    @ProfileId INT
AS
BEGIN
SELECT
  mo.ModuleOptionId,
  mo.ModuleId,
  mo.OptionName,
  mo.Path AS OptionPath,
  m.Name AS ModuleName,
  m.Path AS ModulePath,
  m.Description AS ModuleDescription,
  ISNULL(pp.Active, 0) AS Active
FROM ModulesOptions mo
JOIN Modules m ON mo.ModuleId = m.ModuleId
LEFT JOIN ProfilesModules pp ON
  pp.ModuleOptionId = mo.ModuleOptionId AND
  pp.ProfileId = @ProfileId
  
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfilePermissionsActive]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [dbo].[GetProfilePermissionsActive]
    @ProfileId INT
AS
BEGIN
SELECT
  mo.ModuleOptionId,
  mo.ModuleId,
  mo.OptionName,
  mo.Path AS OptionPath,
  m.Name AS ModuleName,
  m.Path AS ModulePath,
  m.Description AS ModuleDescription,
  ISNULL(pp.Active, 0) AS Active
FROM ModulesOptions mo
JOIN Modules m ON mo.ModuleId = m.ModuleId
LEFT JOIN ProfilesModules pp ON
  pp.ModuleOptionId = mo.ModuleOptionId AND
  pp.ProfileId = @ProfileId
  where Active=1
  
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[GetUserById]
    @UserId INT
AS
BEGIN
    SELECT 
  u.UserId,
  u.IdentificationId,                        
 -- id.Identification AS IdentificationType,
  u.Identification,
  u.Firstname,
  u.Lastname,
  u.Username,
  u.Email,
  u.IsActive,
  i.FilePath 
    FROM Users u
    LEFT JOIN Images i ON u.ImageId = i.ImageId
	INNER JOIN Identification id On u.IdentificationId= id.IdentificationId
    WHERE u.UserId = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[GetUsersByProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUsersByProfile]
    @ProfileId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.UserId,
        u.Username,
        u.Email
    FROM Users u
    INNER JOIN UsersProfiles up ON u.UserId = up.UserId
    WHERE up.ProfileId = @ProfileId;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetUsersWithImages]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUsersWithImages]
AS
BEGIN
    SELECT 
        u.UserId,
		id.Identification AS IdentificationType ,
		u.Identification,
        u.Firstname,
        u.Lastname,
        u.Username,
        u.Email,
        u.IsActive,
        i.FilePath
    FROM Users u
    LEFT JOIN Images i ON u.ImageId = i.ImageId
	INNER JOIN Identification id On u.IdentificationId= id.IdentificationId
END
GO
/****** Object:  StoredProcedure [dbo].[InsertBlackList]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[InsertBlackList] para insertar un dispositivo en la lista negra de la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[InsertBlackList]
    @DeviceId INT,
    @Description NVARCHAR(255),
    @Active BIT = 1
AS
BEGIN
    INSERT INTO BlackList (DeviceId, CreationDate, Description, Active)
    VALUES (@DeviceId, GETDATE(), @Description, @Active);
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[InsertDevice] para insertar dispositivos  en la Herramienta
				*/
CREATE PROCEDURE [dbo].[InsertDevice]
  @DeviceType NVARCHAR(100),
  @Serial NVARCHAR(50),
  @TradeMark NVARCHAR(100),
  @Model NVARCHAR(100),
  @Description NVARCHAR(255),
  @RFID NVARCHAR(50),
  @ImageId INT = NULL,
  @IsActive BIT = 1
AS
BEGIN
  SET NOCOUNT ON;

  -- Validar existencia previa por Serial
  IF EXISTS (SELECT 1 FROM Devices WHERE Serial = @Serial)
  BEGIN
    RAISERROR('Ya existe un dispositivo con el serial proporcionado.', 16, 1);
    RETURN;
  END

  -- Insertar dispositivo
  INSERT INTO Devices (
    DeviceType, Serial, TradeMark, Model,
    Description, RFID, ImageId, IsActive
  )
  VALUES (
    @DeviceType, @Serial, @TradeMark, @Model,
    @Description, @RFID, @ImageId, @IsActive
  );

  -- Loggear evento
  DECLARE @DescriptionLog NVARCHAR(1000);
  SET @DescriptionLog = CONCAT('Se insertó un nuevo dispositivo con serial "', @Serial, '".');

  EXEC [dbo].[LogEvento_Insert]
    @EventLogId = 0,
    @Username = '', -- Puedes pasar como parámetro si prefieres
    @SessionToken = '',
    @Module = 'Dispositivos',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = NULL,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertDeviceType]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20250414
-- Description: Inserta un nuevo tipo de dispositivo en la tabla DeviceTypes
============================================= */
CREATE   PROCEDURE [dbo].[InsertDeviceType]
    @DeviceType NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.DeviceTypes (DeviceType)
    VALUES (@DeviceType);

    -- Log de inserción
    DECLARE @DescriptionLog NVARCHAR(500) = CONCAT('Se creó un nuevo tipo de dispositivo: ', @DeviceType);
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = 'system',
        @SessionToken = '',
        @Module = 'Tipos de Dispositivo',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = NULL,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertImage]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertImage]
    @ImagePath NVARCHAR(255)
AS
BEGIN
    INSERT INTO Images (FilePath)
    VALUES (@ImagePath);

    SELECT SCOPE_IDENTITY() AS ImageId; -- Retorna el ID de la imagen recién insertada
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertNotification]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20250110
-- Description: Creación del procedimiento [dbo].[InsertNotification] para Insertar la notificacion a enviar
--              a los usuarios
	============================================*/
CREATE PROCEDURE [dbo].[InsertNotification]
  @UserId INT = NULL,
  @Type INT = NULL,
  @Message VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;

  -- Validación básica
  IF @Message IS NULL OR LTRIM(RTRIM(@Message)) = ''
  BEGIN
    RAISERROR('El mensaje de notificación no puede estar vacío.', 16, 1);
    RETURN;
  END

  -- Insertar notificación
  INSERT INTO dbo.Notifications (UserId, Type, Message, CreationDate)
  VALUES (@UserId, @Type, @Message, GETDATE());

  DECLARE @NotificationId INT = SCOPE_IDENTITY();

  -- Crear mensaje para log
  DECLARE @DescriptionLog VARCHAR(1000);
  SET @DescriptionLog = CONCAT(
    'Se insertó una notificación para el usuario ', 
    ISNULL(CAST(@UserId AS VARCHAR), 'GLOBAL'), 
    ' con ID: ', @NotificationId
  );

  -- Insertar en log
  EXEC [dbo].[LogEvento_Insert]
    @EventLogId = 0,
    @Username = '',
    @SessionToken = '',
    @Module = 'Notificaciones',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = @UserId,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = @NotificationId;

  -- Retornar ID insertado
  SELECT @NotificationId AS NotificationId;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertPenalty]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20250114
-- Description: Creación del procedimiento [dbo].InsertPenalty] para crear una penalidad para un usuario
	============================================*/
CREATE PROCEDURE [dbo].[InsertPenalty]
  @UserId INT,
  @Description NVARCHAR(255),
  @StartDate DATETIME,
  @EndDate DATETIME,
  @Active BIT = 1
AS
BEGIN
  SET NOCOUNT ON;

  -- Validación de fechas
  IF @StartDate IS NULL OR @EndDate IS NULL OR @EndDate <= @StartDate
  BEGIN
    RAISERROR('La fecha final debe ser posterior a la fecha inicial.', 16, 1);
    RETURN;
  END

  -- Insertar penalidad
  INSERT INTO dbo.Penalties (UserId, Description, StartDate, EndDate, Active)
  VALUES (@UserId, @Description, @StartDate, @EndDate, @Active);

  DECLARE @PenaltyId INT = SCOPE_IDENTITY();

  -- Logging
  DECLARE @Username NVARCHAR(100) = (SELECT Username FROM dbo.Users WHERE UserId = @UserId);
  DECLARE @LogMessage NVARCHAR(1000) = CONCAT(
    'Se insertó una penalización al usuario ', @Username,
    ' desde ', CONVERT(VARCHAR, @StartDate, 120),
    ' hasta ', CONVERT(VARCHAR, @EndDate, 120)
  );

  EXEC dbo.LogEvento_Insert
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Penalizaciones',
    @Description = @LogMessage,
    @ClientIp = '',
    @EventUserId = @UserId,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = @PenaltyId;

  -- Retornar ID generado
  SELECT @PenaltyId AS PenaltyId;
END;


GO
/****** Object:  StoredProcedure [dbo].[InsertProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[InsertProfile] para insertar perfiles de usuario  en la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[InsertProfile]
    @Name NVARCHAR(100),
    @Description NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validación: Nombre único
    IF EXISTS (
        SELECT 1 FROM dbo.Profiles
        WHERE Name = @Name AND Eliminated = 0
    )
    BEGIN
        RAISERROR('Ya existe un perfil activo con ese nombre.', 16, 1);
        RETURN;
    END

    -- Insertar perfil
    INSERT INTO dbo.Profiles (Name, Description, CreationDate, Eliminated, EliminationDate)
    VALUES (@Name, @Description, GETDATE(), 0, NULL);

    DECLARE @IdProfile INT = SCOPE_IDENTITY();

    -- Logging
    DECLARE @LogDescription NVARCHAR(1000) = CONCAT('Se creó el perfil: ', @Name);

    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = '', 
        @SessionToken = '',
        @Module = 'Perfiles',
        @Description = @LogDescription,
        @ClientIp = '',
        @EventUserId = NULL,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = @IdProfile;

    -- Retornar el ID insertado
    SELECT @IdProfile AS IdProfile;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertProgram]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================
   Autor: Daniel Felipe Leon Higuera
   Fecha: 20250414
   Descripción: Insertar nuevo programa
============================================= */
CREATE   PROCEDURE [dbo].[InsertProgram]
  @Program VARCHAR(200),
  @Description VARCHAR(200),
  @SchoolId INT,
  @Active BIT = 1
AS
BEGIN
  INSERT INTO Program (Program, Description, SchoolId, Active)
  VALUES (@Program, @Description, @SchoolId, @Active);

  -- Log
  DECLARE @Username VARCHAR(100) = 'system';
  DECLARE @DescriptionLog VARCHAR(1000) = CONCAT('Se creó el programa "', @Program, '"');

  EXEC dbo.LogEvento_Insert
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Programas',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = NULL,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertRoom]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[InsertRoom] para Insertar una sala en la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[InsertRoom]
    @Name NVARCHAR(100),
    @Description NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    --  Validación de duplicado
    IF EXISTS (SELECT 1 FROM dbo.Rooms WHERE Name = @Name)
    BEGIN
        RAISERROR('Ya existe una sala con ese nombre.', 16, 1);
        RETURN;
    END

    --  Inserción
    INSERT INTO Rooms (Name, Description)
    VALUES (@Name, @Description);

    DECLARE @RoomId INT = SCOPE_IDENTITY();

    --  Logging del evento
    DECLARE @LogDescription NVARCHAR(1000) = CONCAT('Se creó la sala: ', @Name);

    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = 'system', -- Reemplaza con sesión real si aplica
        @SessionToken = '',
        @Module = 'Salas',
        @Description = @LogDescription,
        @ClientIp = '',
        @EventUserId = NULL,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = @RoomId;

    --  Retornar el ID insertado
    SELECT @RoomId AS RoomId;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertRoomDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[InsertRoomDevice] para Insertar un dispositivo en una sala en la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[InsertRoomDevice]
    @RoomId INT,
    @DeviceId INT
AS
BEGIN
    SET NOCOUNT ON;

    --  Validar si ya existe esa relación
    IF EXISTS (
        SELECT 1
        FROM RoomDevice
        WHERE RoomId = @RoomId AND DeviceId = @DeviceId
    )
    BEGIN
        RAISERROR('El dispositivo ya está asignado a esta sala.', 16, 1);
        RETURN;
    END;

    --  Insertar
    INSERT INTO RoomDevice (RoomId, DeviceId)
    VALUES (@RoomId, @DeviceId);

    DECLARE @InsertedId INT = SCOPE_IDENTITY();

    --  Registro en log
    DECLARE @RoomName NVARCHAR(100) = (SELECT Name FROM Rooms WHERE RoomId = @RoomId);
    DECLARE @Serial NVARCHAR(50) = (SELECT Serial FROM Devices WHERE DeviceId = @DeviceId);
    DECLARE @DescLog NVARCHAR(1000) = CONCAT('Se asignó el dispositivo ', @Serial, ' a la sala ', @RoomName);

    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = '', 
        @SessionToken = '',
        @Module = 'Salas',
        @Description = @DescLog,
        @ClientIp = '',
        @EventUserId = NULL,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = @InsertedId;

    --  Retornar el ID insertado
    SELECT @InsertedId AS RoomDeviceId;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertUser]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241227
-- Description: Creación del procedimiento [dbo].[InsertUser] para Inserccion de Usuarios en la Herramienta
				*/
CREATE PROCEDURE [dbo].[InsertUser]
  @IdentificationId INT,
  @Identification int,
  @Firstname NVARCHAR(100),
  @Lastname NVARCHAR(100),
  @Username NVARCHAR(50),
  @Password NVARCHAR(255), -- Contraseña ya encriptada
  @ImageId INT = NULL,
  @Email NVARCHAR(100),
  @Ldap BIT = 0,
  @IsActive BIT = 1,
  @ProgramId INT
AS
BEGIN
  SET NOCOUNT ON;

  IF EXISTS (SELECT 1 FROM dbo.Users WHERE Username = @Username)
BEGIN
    RAISERROR('El nombre de usuario ya existe', 16, 1);
    RETURN;
END

IF EXISTS (SELECT 1 FROM dbo.Users WHERE Email = @Email)
BEGIN
    RAISERROR('El correo electrónico ya está registrado', 16, 1);
    RETURN;
END


    -- Insertar directamente la contraseña encriptada
  INSERT INTO dbo.Users ( IdentificationId,Identification,Firstname, Lastname, Username, Password, ImageId, Email, Ldap, IsActive, CreatedDate,ProgramId)
  VALUES (@IdentificationId,@Identification,@Firstname, @Lastname, @Username, @Password, @ImageId, @Email, @Ldap, @IsActive, GETDATE(),@ProgramId);

  PRINT 'Usuario insertado correctamente';

					Declare @DescriptionLog varchar (1000);



  				--DL:20250308 Se puede modificar el mensaje de la descripción aquí
				set @DescriptionLog = (select CONCAT('Se registra a: ',@Firstname,' ',@Lastname, 'con el usuario: ',@Username)); 


				--DL:20250308 Llamado al procedimiento para dejar el log
				EXEC [dbo].[LogEvento_Insert]
				@EventLogId = 0,
				@Username = @username,
				@SessionToken = '',
				@Module = 'Usuarios',
				@Description = @DescriptionLog,
				@ClientIp = '',
				@RegisterDate = null,
				@ExecutionStatus = null,
				@ExecutionMessage  = null,
				@ProcedureStatus = null,
				@ProcedureMessage = null,
				@ProcedureValue = null




END;
GO
/****** Object:  StoredProcedure [dbo].[InsertUserProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
Autor: Daniel Felipe Leon Higuera
Create date: 2024-12-28
Description: Asigna un perfil a un usuario si no ha sido asignado previamente.
             
============================================= */
CREATE PROCEDURE [dbo].[InsertUserProfile]
  @ProfileId INT,
  @UserId INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Verificar si ya existe la relación
  IF EXISTS (
    SELECT 1 FROM UsersProfiles WHERE ProfileId = @ProfileId AND UserId = @UserId
  )
  BEGIN
    RAISERROR('El usuario ya tiene asignado este perfil.', 16, 1);
    RETURN;
  END

  -- Insertar relación
  INSERT INTO UsersProfiles (ProfileId, UserId)
  VALUES (@ProfileId, @UserId);

  -- Registrar en log
  DECLARE @Username NVARCHAR(100);
  DECLARE @ProfileName NVARCHAR(100);
  DECLARE @DescriptionLog NVARCHAR(1000);

  SELECT @Username = Username FROM dbo.Users WHERE UserId = @UserId;
  SELECT @ProfileName = Name FROM dbo.Profiles WHERE IdProfile = @ProfileId;

  SET @DescriptionLog = CONCAT('Al usuario ', @Username, ' se le asignó el perfil ', @ProfileName);

  EXEC [dbo].[LogEvento_Insert]
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Perfiles',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = @UserId,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[LogEvento_Insert]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[LogEvento_Insert]
	-- Parametros del procedimiento
	@EventLogId                            	     int,
	@Username                               	varchar(50),
	@SessionToken                            	varchar(500),
	@Module                                	    varchar(100),
	@Description                            	varchar(2000),
	@ClientIp                            	    varchar(50),
	@RegisterDate                         	    datetime,
	@EventUserId							    int = null,  ----
	@ExecutionStatus                        	bit OUTPUT,
	@ExecutionMessage                       	nvarchar(MAX) OUTPUT,
	@ProcedureStatus                        	bit OUTPUT,
	@ProcedureMessage                       	nvarchar(MAX) OUTPUT,
	@ProcedureValue								nvarchar(MAX) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		-- Variables de control del procedimiento
		SET @ExecutionStatus = 1
		SET @ExecutionMessage = ''
		SET @ProcedureStatus = 1
		SET @ProcedureMessage = ''
		SET @ProcedureValue = ''

		--Daniel Leon 20250308: SE AGREGA EL VALOR POR DEFECTO AL CAMPO @RegisterDate
		if @RegisterDate is null 
		begin
			set @RegisterDate = (select GETDATE())
		end 

		--BEGIN TRANSACTION -- Iniciar transaccion
		-- Insertar informacion del registro
		INSERT INTO dbo.EventLog (
					 Username
					, SessionToken
					, Module
					, Description
					, ClientIp
					, RegisterDate
					,EventUserId
) 
			VALUES ( @Username
					, @SessionToken
					, @Module
					, @Description
					, @ClientIp
					, @RegisterDate
					, @EventUserId) 
	END TRY
	BEGIN CATCH
		--ROLLBACK TRANSACTION -- Finalizar transaccion
		-- Variables de control de ejecucion del procedimiento
		SET @ExecutionStatus = 0
		SET @ExecutionMessage = 'Error Message: ' + ERROR_MESSAGE() + char(10) + 'Error Number: ' + CONVERT(nvarchar,ERROR_NUMBER()) + char(10) + 'Error Severity: ' + CONVERT(nvarchar,ERROR_SEVERITY()) + char(10) + 'Error State: ' + CONVERT(nvarchar,ERROR_STATE()) + char(10) + 'Error Procedure: ' + CONVERT(nvarchar(200),ERROR_PROCEDURE()) + char(10) + 'Error Line: ' + CONVERT(nvarchar,ERROR_LINE())
		SET @ProcedureStatus = 0
		SET @ProcedureMessage = 'Error Message: ' + ERROR_MESSAGE() + char(10) + 'Error Number: ' + CONVERT(nvarchar,ERROR_NUMBER()) + char(10) + 'Error Severity: ' + CONVERT(nvarchar,ERROR_SEVERITY()) + char(10) + 'Error State: ' + CONVERT(nvarchar,ERROR_STATE()) + char(10) + 'Error Procedure: ' + CONVERT(nvarchar(200),ERROR_PROCEDURE()) + char(10) + 'Error Line: ' + CONVERT(nvarchar,ERROR_LINE())
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[LoginUser]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20250114
-- Description: Creación del procedimiento [dbo].[LoginUser] LoginUser con verificación de contraseña encriptada
				
-- Procedimiento almacenado: LoginUser con comparación de contraseña encriptada
-- Procedimiento almacenado: LoginUser con comparación de contraseña encriptada
 =============================================*/
CREATE PROCEDURE [dbo].[LoginUser]
    @Username VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @UserId INT,
        @ProfileId INT,
        @DescriptionLog VARCHAR(1000);

    --  Validar usuario y contraseña
    SELECT TOP 1 @UserId = u.UserId
    FROM Users u
    WHERE u.Username = @Username
      AND u.Password = @Password
      AND u.IsActive = 1;

    IF @UserId IS NULL
    BEGIN
        RAISERROR('Usuario no encontrado o contraseña incorrecta', 16, 1);
        RETURN;
    END;

    --  Obtener ProfileId
    SELECT TOP 1 @ProfileId = ProfileId
    FROM UsersProfiles
    WHERE UserId = @UserId;

    IF @ProfileId IS NULL
    BEGIN
        RAISERROR('El usuario no tiene permiso de ingreso en el sistema', 16, 1);
        RETURN;
    END;

    -- 📤 Devolver datos completos
    SELECT 
        u.UserId,
        u.Username,
        u.Email,
        u.Firstname,
        u.Lastname,
        u.Identification,
        u.IdentificationId,
        i.Name AS IdentificationType,
        u.ProgramId,
        p.Program,
        @ProfileId AS ProfileId,
        ISNULL(img.FilePath, '') AS Image
    FROM Users u
    LEFT JOIN Identification i ON u.IdentificationId = i.IdentificationId
    LEFT JOIN Program p ON u.ProgramId = p.ProgramId
    LEFT JOIN Images img ON u.ImageId = img.ImageId
    WHERE u.UserId = @UserId;

    -- 🪵 Lo de ingreso
    SET @DescriptionLog = CONCAT('El Usuario : ', @Username, ' ingresa exitosamente en el sistema');

    EXEC [dbo].[LogEvento_Insert]
        @EventLogId = 0,
        @Username = @Username,
        @SessionToken = '',
        @Module = 'Login',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = @UserId,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;



GO
/****** Object:  StoredProcedure [dbo].[RemoveUserFromDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
-- Autor: Daniel Felipe Leon Higuera
-- Create date: 2024-12-28
-- Description: Eliminación de la relación usuario-dispositivo + log de auditoría
============================================= */
CREATE PROCEDURE [dbo].[RemoveUserFromDevice]
  @UserId INT,
  @DeviceId INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Verificar existencia
  IF NOT EXISTS (
    SELECT 1 FROM UserDevices WHERE UserId = @UserId AND DeviceId = @DeviceId
  )
  BEGIN
    RAISERROR('La asignación no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminar asignación
  DELETE FROM UserDevices WHERE UserId = @UserId AND DeviceId = @DeviceId;

  -- Recolección de datos
  DECLARE @Username NVARCHAR(100) = (SELECT Username FROM Users WHERE UserId = @UserId);
  DECLARE @Serial NVARCHAR(50) = (SELECT Serial FROM Devices WHERE DeviceId = @DeviceId);
  DECLARE @DescLog NVARCHAR(1000) = CONCAT('Se eliminó la asignación del dispositivo ', @Serial, ' al usuario ', @Username);

  -- Registro de evento
  EXEC dbo.LogEvento_Insert
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Dispositivos',
    @Description = @DescLog,
    @ClientIp = '',
    @EventUserId = @UserId,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;

  --  Resultado opcional
  SELECT 'Relación eliminada correctamente' AS Resultado;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_RegisterEntrance]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
-- Autor: Daniel Felipe Leon Higuera
-- Create date: 2025-01-14
-- Descripción: Control de acceso mediante RFID + registro en log de evento
============================================= */
CREATE PROCEDURE [dbo].[sp_RegisterEntrance]
    @RFID NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @UserDeviceId INT,
        @UserId INT,
        @EntryId INT,
        @Username NVARCHAR(100),
        @Serial NVARCHAR(100),
        @EventDescription NVARCHAR(1000),
        @Estado NVARCHAR(20);

    -- Obtener información del dispositivo, usuario y otros datos asociados
-- Obtener información básica del dispositivo y usuario por RFID
SELECT TOP 1
    @UserDeviceId = ud.UserDeviceId,
    @UserId = ud.UserId,
    @Username = u.Username,
    @Serial = d.Serial
FROM UserDevices ud
INNER JOIN Devices d ON d.DeviceId = ud.DeviceId
INNER JOIN Users u ON u.UserId = ud.UserId
WHERE d.RFID = @RFID;

    -- Validar existencia
    IF @UserDeviceId IS NULL OR @UserId IS NULL
    BEGIN
        RAISERROR('Dispositivo no asignado o no encontrado.', 16, 1);
        RETURN;
    END;

    -- Verificar si ya existe una entrada sin salida
    SELECT TOP 1 @EntryId = EntryId
    FROM Entrance
    WHERE UserDeviceId = @UserDeviceId AND DateOut IS NULL
    ORDER BY DateIN DESC;

    -- Registrar entrada o salida
    IF @EntryId IS NOT NULL
    BEGIN
        -- Salida
        UPDATE Entrance
        SET DateOut = GETDATE()
        WHERE EntryId = @EntryId;

        SET @Estado = 'Salida';
        SET @EventDescription = CONCAT('El usuario ', @Username, ' hizo SALIDA con el dispositivo ', @Serial, ' vía RFID: ', @RFID);
    END
    ELSE
    BEGIN
        -- Entrada
        INSERT INTO Entrance (UserId, UserDeviceId, DateIN)
        VALUES (@UserId, @UserDeviceId, GETDATE());

        SET @Estado = 'Entrada';
        SET @EventDescription = CONCAT('El usuario ', @Username, ' hizo ENTRADA con el dispositivo ', @Serial, ' vía RFID: ', @RFID);
    END;

    -- Log de evento
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = @Username,
        @SessionToken = '',
        @Module = 'Entradas',
        @Description = @EventDescription,
        @ClientIp = '',
        @EventUserId = @UserId,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;

    -- Respuesta con detalles del usuario y dispositivo
    SELECT 
        @Estado AS Estado,
        u.Username,
        u.Email,
        u.Firstname,
        u.Lastname,
        u.Identification AS Identification,       
        p.Program AS [Program],
        ISNULL(ui.FilePath, '') AS UserImagePath,
        dt.DeviceType,
        d.Serial,
        d.TradeMark,
        d.Model,
        d.Description,
        ISNULL(di.FilePath, '') AS DeviceImagePath
    FROM UserDevices ud
    INNER JOIN Users u ON ud.UserId = u.UserId
    LEFT JOIN Identification i ON u.IdentificationId = i.IdentificationId 
    LEFT JOIN [Program] p ON u.ProgramId = p.ProgramId                        
    LEFT JOIN Images ui ON u.ImageId = ui.ImageId
    INNER JOIN Devices d ON ud.DeviceId = d.DeviceId
    INNER JOIN DeviceTypes dt ON d.DeviceType = dt.DeviceTypeId
    LEFT JOIN Images di ON d.ImageId = di.ImageId
    WHERE ud.UserDeviceId = @UserDeviceId;

END
GO
/****** Object:  StoredProcedure [dbo].[UpdateBlackListDescription]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[UpdateBlackList] para Actualizar un dispositivo en la lista negra de la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[UpdateBlackListDescription]
    @ListId INT,
    @Description NVARCHAR(255)
AS
BEGIN
    UPDATE BlackList
    SET Description = @Description
    WHERE ListId = @ListId;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[UpdateDevice] para actualizar dispositivos  en la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[UpdateDevice]
    @DeviceId INT,
    @DeviceType NVARCHAR(100),
    @Serial NVARCHAR(50),
    @TradeMark NVARCHAR(100),
    @Model NVARCHAR(100),
    @Description NVARCHAR(255) = NULL,
    @RFID NVARCHAR(50) = NULL,
    @ImageId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @Username NVARCHAR(100),
        @UserId INT,
        @DescriptionLog VARCHAR(1000);

    -- Obtener datos de auditoría (solo si están relacionados al dispositivo)
    SELECT TOP 1 
        @Username = u.Username,
        @UserId = u.UserId
    FROM UserDevices ud
    INNER JOIN Users u ON u.UserId = ud.UserId
    WHERE ud.DeviceId = @DeviceId;

    -- Actualización
    UPDATE dbo.Devices
    SET 
        DeviceType = @DeviceType,
        Serial = @Serial,
        TradeMark = @TradeMark,
        Model = @Model,
        Description = @Description,
        RFID = @RFID,
        ImageId = @ImageId
    WHERE DeviceId = @DeviceId;

    -- Construcción del log
    SET @DescriptionLog = CONCAT('Se actualizó el dispositivo con serial: ', @Serial);

    -- Registro de evento
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = @Username,
        @SessionToken = '',
        @Module = 'Dispositivos',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = @UserId,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateDeviceStatus]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241227
-- Description: Creación del procedimiento [dbo].[UpdateDeviceStatus] Para actualizar estado del dispositivo
				
-- Parametros: DeviceId: Identificador de Usuario
               IsActive: Campo de validacion de registro activo o inactivo 

 =============================================*/
CREATE PROCEDURE [dbo].[UpdateDeviceStatus]
  @DeviceId INT,
  @IsActive BIT
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE 
    @Username NVARCHAR(100),
    @UserId INT,
    @DescriptionLog NVARCHAR(1000),
    @Estado NVARCHAR(20);

  -- Obtener usuario asignado al dispositivo
  SELECT TOP 1
    @UserId = u.UserId,
    @Username = u.Username
  FROM UserDevices ud
  INNER JOIN Users u ON u.UserId = ud.UserId
  WHERE ud.DeviceId = @DeviceId;

  -- Actualizar estado del dispositivo
  UPDATE Devices
  SET IsActive = @IsActive
  WHERE DeviceId = @DeviceId;

  -- Construcción del estado y descripción
  SET @Estado = CASE WHEN @IsActive = 1 THEN 'Activado' ELSE 'Desactivado' END;
  SET @DescriptionLog = CONCAT('El dispositivo con ID: ', @DeviceId, ' fue ', @Estado);

  -- Registro en log
  EXEC dbo.LogEvento_Insert
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Dispositivos',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = @UserId,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateDeviceType]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================
-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20250414
-- Description: Actualiza el nombre de un tipo de dispositivo
============================================= */
CREATE   PROCEDURE [dbo].[UpdateDeviceType]
    @DeviceTypeId INT,
    @DeviceType NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @OldName NVARCHAR(100);

    SELECT @OldName = DeviceType FROM dbo.DeviceTypes WHERE DeviceTypeId = @DeviceTypeId;

    UPDATE dbo.DeviceTypes
    SET DeviceType = @DeviceType
    WHERE DeviceTypeId = @DeviceTypeId;

    -- Log del cambio
    DECLARE @DescriptionLog NVARCHAR(500) = CONCAT(
        'Actualización de TipoDispositivo (ID=', @DeviceTypeId, '): ',
        @OldName, ' → ', @DeviceType
    );

    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = 'system',
        @SessionToken = '',
        @Module = 'Tipos de Dispositivo',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = NULL,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* ===========================================================================================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241227
-- Description: Creación del procedimiento [dbo].[UpdateProfile] para Actualizacion de Perfiles en la Herramienta

	==========================================================================================================*/
CREATE PROCEDURE [dbo].[UpdateProfile]
    @IdProfile INT,
    @Name NVARCHAR(255),
    @Description NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @Username NVARCHAR(100),
        @UserId INT,
        @DescriptionLog NVARCHAR(1000);

    -- Obtener un usuario vinculado al perfil (si lo hay)
    SELECT TOP 1
        @UserId = up.UserId,
        @Username = u.Username
    FROM UsersProfiles up
    INNER JOIN Users u ON u.UserId = up.UserId
    WHERE up.ProfileId = @IdProfile;

    -- Actualizar perfil
    UPDATE Profiles
    SET 
        Name = @Name, 
        Description = @Description
    WHERE IdProfile = @IdProfile;

    -- Construir descripción para el log
    SET @DescriptionLog = CONCAT('Perfil actualizado. Nuevo nombre: "', @Name, '", nueva descripción: "', @Description, '"');

    -- Registrar en el log de eventos
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = @Username,
        @SessionToken = '',
        @Module = 'Perfiles',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = @UserId,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfilePermissions]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* ===========================================================================================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241227
-- Description: Creación del procedimiento [dbo].[UpdateProfilePermissions] para Actualizacion de Permisos de un Perfil en la Herramienta

	==========================================================================================================*/
CREATE PROCEDURE [dbo].[UpdateProfilePermissions]
    @ProfileId INT,
    @ModuleId INT,
    @ModuleOptionId INT,
    @Active BIT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Now DATETIME = GETDATE();
    DECLARE @ProfileName NVARCHAR(100);
    DECLARE @ModuleName NVARCHAR(100);
    DECLARE @OptionName NVARCHAR(100);
    DECLARE @Action NVARCHAR(10);
    DECLARE @LogDescription NVARCHAR(1000);

    --  Obtener los nombres descriptivos
    SELECT @ProfileName = Name FROM Profiles WHERE IdProfile = @ProfileId;
    SELECT @ModuleName = Name FROM Modules WHERE ModuleId = @ModuleId;
    SELECT @OptionName = OptionName FROM ModulesOptions WHERE ModuleOptionId = @ModuleOptionId;

    -- e actualización/inserción
    IF EXISTS (
        SELECT 1 FROM ProfilesModules
        WHERE ProfileId = @ProfileId AND ModuleId = @ModuleId AND ModuleOptionId = @ModuleOptionId
    )
    BEGIN
        UPDATE ProfilesModules
        SET Active = @Active
        WHERE ProfileId = @ProfileId AND ModuleId = @ModuleId AND ModuleOptionId = @ModuleOptionId;

        SET @Action = 'UPDATE';
    END
    ELSE 
    BEGIN
        INSERT INTO ProfilesModules (ProfileId, ModuleId, ModuleOptionId, Active)
        VALUES (@ProfileId, @ModuleId, @ModuleOptionId, @Active);

        SET @Action = 'INSERT';
    END

    -- 🧾 Descripción legible para logs
    SET @LogDescription = CONCAT(
        'Se ', 
        CASE WHEN @Action = 'INSERT' THEN 'asignó' ELSE 'actualizó' END,
        ' permiso [', @OptionName, '] al perfil "', @ProfileName,
        '" en el módulo "', @ModuleName, '". Estado: ', 
        CASE WHEN @Active = 1 THEN 'Activo' ELSE 'Inactivo' END
    );

    -- 📥 Registrar evento
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = '', 
        @SessionToken = '',
        @Module = 'Perfiles',
        @Description = @LogDescription,
        @ClientIp = '',
        @EventUserId = NULL,
        @RegisterDate = NULL,
        @ExecutionStatus = 1,
        @ExecutionMessage = 'Ejecución exitosa',
        @ProcedureStatus = 1,
        @ProcedureMessage = @Action,
        @ProcedureValue = @ProfileId;
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfileStatus]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateProfileStatus]
    @IdProfile INT,
    @Eliminated BIT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Eliminated = 1
    BEGIN
        UPDATE Profiles
        SET Eliminated = 1,
            EliminationDate = GETDATE()
        WHERE IdProfile = @IdProfile;
    END
    ELSE
    BEGIN
        UPDATE Profiles
        SET Eliminated = 0,
            EliminationDate = NULL
        WHERE IdProfile = @IdProfile;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateProgram]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================
   Autor: Daniel Felipe Leon Higuera
   Fecha: 20250414
   Descripción: Procedimiento para actualizar un programa
============================================= */
CREATE   PROCEDURE [dbo].[UpdateProgram]
  @ProgramId INT,
  @Program VARCHAR(200),
  @Description VARCHAR(200),
  @SchoolId INT,
  @Active BIT
AS
BEGIN
  DECLARE @OldProgram VARCHAR(200);
  SELECT @OldProgram = Program FROM Program WHERE ProgramId = @ProgramId;

  UPDATE Program
  SET 
    Program = @Program,
    Description = @Description,
    SchoolId = @SchoolId,
    Active = @Active
  WHERE ProgramId = @ProgramId;

  -- Log
  DECLARE @Username VARCHAR(100) = 'system';
  DECLARE @DescriptionLog VARCHAR(1000) = CONCAT('Se actualizó el programa "', @OldProgram, '" a "', @Program, '"');

  EXEC dbo.LogEvento_Insert
    @EventLogId = 0,
    @Username = @Username,
    @SessionToken = '',
    @Module = 'Programas',
    @Description = @DescriptionLog,
    @ClientIp = '',
    @EventUserId = NULL,
    @RegisterDate = NULL,
    @ExecutionStatus = NULL,
    @ExecutionMessage = NULL,
    @ProcedureStatus = NULL,
    @ProcedureMessage = NULL,
    @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateRoom]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Procedimiento actualizado [dbo].[UpdateRoom] para auditar actualizaciones de salas en la Herramienta

=============================================*/
CREATE PROCEDURE [dbo].[UpdateRoom]
    @RoomId INT,
    @Name NVARCHAR(100),
    @Description NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @Username NVARCHAR(100) = 'Sistema', -- Valor por defecto si no se puede inferir usuario
        @UserId INT = NULL,
        @DescriptionLog NVARCHAR(1000);

    -- Obtener usuario que usó la sala recientemente (si lo hay)
    SELECT TOP 1 
        @UserId = ud.UserId,
        @Username = u.Username
    FROM RoomDevice rd
    INNER JOIN UserDevices ud ON rd.DeviceId = ud.DeviceId
    INNER JOIN Users u ON ud.UserId = u.UserId
    WHERE rd.RoomId = @RoomId;

    -- Actualizar información de la sala
    UPDATE Rooms
    SET 
        Name = @Name,
        Description = @Description
    WHERE RoomId = @RoomId;

    -- Descripción del evento para el log
    SET @DescriptionLog = CONCAT('Se actualizó la sala con ID ', @RoomId, '. Nuevo nombre: "', @Name, '", nueva descripción: "', ISNULL(@Description, 'N/A'), '".');

    -- Registrar evento
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = @Username,
        @SessionToken = '',
        @Module = 'Salas',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = @UserId,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateRoomDevice]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[UpdateRoomDevice] para Actualizar un dispositivo en una sala en la Herramienta
	============================================*/
CREATE PROCEDURE [dbo].[UpdateRoomDevice]
    @RoomDeviceId INT,
    @RoomId INT,
    @DeviceId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @OldRoomId INT,
        @OldDeviceId INT,
        @Username NVARCHAR(100) = 'Sistema',
        @UserId INT = NULL,
        @DescriptionLog NVARCHAR(1000);

    -- Obtener datos anteriores
    SELECT 
        @OldRoomId = RoomId,
        @OldDeviceId = DeviceId
    FROM RoomDevices
    WHERE RoomDeviceId = @RoomDeviceId;

    -- Obtener algún usuario relacionado con el dispositivo si existe
    SELECT TOP 1
        @UserId = ud.UserId,
        @Username = u.Username
    FROM UserDevices ud
    INNER JOIN Users u ON u.UserId = ud.UserId
    WHERE ud.DeviceId = @OldDeviceId;

    -- Actualizar relación
    UPDATE RoomDevices
    SET 
        RoomId = @RoomId,
        DeviceId = @DeviceId
    WHERE RoomDeviceId = @RoomDeviceId;

    -- Crear mensaje de log
    SET @DescriptionLog = CONCAT(
        'Se actualizó la relación RoomDeviceId ', @RoomDeviceId,
        ': de Sala ', ISNULL(CAST(@OldRoomId AS NVARCHAR), 'NULL'),
        ' → ', @RoomId,
        ', Dispositivo ', ISNULL(CAST(@OldDeviceId AS NVARCHAR), 'NULL'),
        ' → ', @DeviceId
    );

    -- Ejecutar log
    EXEC dbo.LogEvento_Insert
        @EventLogId = 0,
        @Username = @Username,
        @SessionToken = '',
        @Module = 'Salas',
        @Description = @DescriptionLog,
        @ClientIp = '',
        @EventUserId = @UserId,
        @RegisterDate = NULL,
        @ExecutionStatus = NULL,
        @ExecutionMessage = NULL,
        @ProcedureStatus = NULL,
        @ProcedureMessage = NULL,
        @ProcedureValue = NULL;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/* ===========================================================================================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241227
-- Description: Creación del procedimiento [dbo].[UpdateUser] para Actualizacion de Usuarios en la Herramienta

	==========================================================================================================*/
CREATE PROCEDURE [dbo].[UpdateUser]
    @UserId INT,
    @IdentificationId INT,
    @Identification INT,
    @Firstname NVARCHAR(100),
    @Lastname NVARCHAR(100),
    @Username NVARCHAR(50),
    @Password NVARCHAR(255) = NULL,
    @ImageId INT = NULL,
    @Email NVARCHAR(100),
    @Ldap BIT = 0,
    @IsActive BIT,
	@ProgramId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @OldFirstname NVARCHAR(100),
        @OldLastname NVARCHAR(100),
        @OldUsername NVARCHAR(50),
        @OldEmail NVARCHAR(100),
        @OldIsActive BIT,
        @OldLdap BIT,
        @OldIdentificationId INT,
        @OldIdentification INT,
        @OldImageId INT,
		@OldProgramId INT,
        @EventUsername NVARCHAR(50),
        @Changes NVARCHAR(MAX) = '',
        @SessionToken NVARCHAR(100) = '',
        @ClientIp NVARCHAR(100) = '';

    -- Obtener datos antiguos
    SELECT
        @OldFirstname = Firstname,
        @OldLastname = Lastname,
        @OldUsername = Username,
        @OldEmail = Email,
        @OldIsActive = IsActive,
        @OldLdap = Ldap,
        @OldIdentificationId = IdentificationId,
        @OldIdentification = Identification,
        @OldImageId = ImageId,
		@OldProgramId = ProgramId,
        @EventUsername = Username
    FROM Users
    WHERE UserId = @UserId;

    -- Validar cambios campo a campo y concatenar descripción si es diferente
    IF @OldFirstname <> @Firstname
        SET @Changes += 'Firstname( ' + ISNULL(@OldFirstname, '') + ' Nuevo Valor ' + ISNULL(@Firstname, '') + '), ';
    IF @OldLastname <> @Lastname
        SET @Changes += 'Lastname( ' + ISNULL(@OldLastname, '') + '  Nuevo Valor  ' + ISNULL(@Lastname, '') + '), ';
    IF @OldUsername <> @Username
        SET @Changes += 'Username( ' + ISNULL(@OldUsername, '') + '  Nuevo Valor  ' + ISNULL(@Username, '') + '), ';
    IF @OldEmail <> @Email
        SET @Changes += 'Email( ' + ISNULL(@OldEmail, '') + '  Nuevo Valor  ' + ISNULL(@Email, '') + '), ';
    IF @OldIsActive <> @IsActive
        SET @Changes += 'IsActive( ' + CAST(@OldIsActive AS NVARCHAR) + '  Nuevo Valor  ' + CAST(@IsActive AS NVARCHAR) + '), ';
    IF @OldLdap <> @Ldap
        SET @Changes += 'Ldap( ' + CAST(@OldLdap AS NVARCHAR) + '  Nuevo Valor  ' + CAST(@Ldap AS NVARCHAR) + '), ';
    IF @OldIdentificationId <> @IdentificationId
        SET @Changes += 'IdentificationId( ' + CAST(@OldIdentificationId AS NVARCHAR) + '  Nuevo Valor  ' + CAST(@IdentificationId AS NVARCHAR) + '), ';
    IF @OldIdentification <> @Identification
        SET @Changes += 'Identification( ' + CAST(@OldIdentification AS NVARCHAR) + '  Nuevo Valor  ' + CAST(@Identification AS NVARCHAR) + '), ';
    
	 IF @OldProgramId <> @ProgramId
        SET @Changes += 'Programa( ' + CAST(@OldProgramId AS NVARCHAR) + '  Nuevo Valor  ' + CAST(@ProgramId AS NVARCHAR) + '), ';

    IF ISNULL(@OldImageId, -1) <> ISNULL(@ImageId, -1)
        SET @Changes += 'ImageId( ' + CAST(ISNULL(@OldImageId, -1) AS NVARCHAR) + '  Nuevo Valor  ' + CAST(ISNULL(@ImageId, -1) AS NVARCHAR) + '), ';

    -- Ejecutar UPDATE solo si hubo cambios
    IF LEN(@Changes) > 0
    BEGIN
        UPDATE Users
        SET 
            IdentificationId = @IdentificationId,
            Identification = @Identification,
            Firstname = @Firstname,
            Lastname = @Lastname,
            Username = @Username,
            Password = CASE WHEN @Password IS NOT NULL THEN @Password ELSE Password END,
            ImageId = ISNULL(@ImageId, ImageId),
            Email = @Email,
            Ldap = @Ldap,
            IsActive = @IsActive,
			ProgramId = @ProgramId
        WHERE UserId = @UserId;

        -- Remover última coma y espacio
        SET @Changes = LEFT(@Changes, LEN(@Changes) - 2);

		DECLARE @DescriptionFinal NVARCHAR(MAX);

			SET @DescriptionFinal = CONCAT(N'Actualización de usuario  ', CONVERT(NVARCHAR(50), @Username), ': ', @Changes);



        -- Insertar en log
        EXEC dbo.LogEvento_Insert
            @EventLogId = 0,
            @Username = @EventUsername,
            @SessionToken = @SessionToken,
            @Module = 'Usuarios',
            @Description = @DescriptionFinal,
            @ClientIp = @ClientIp,
            @EventUserId = @UserId,
            @RegisterDate = NULL,
            @ExecutionStatus = NULL,
            @ExecutionMessage = NULL,
            @ProcedureStatus = NULL,
            @ProcedureMessage = NULL,
            @ProcedureValue = NULL;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserProfile]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241228
-- Description: Creación del procedimiento [dbo].[UpdateUserProfile] para Actualizar perfiles a un usuario  en la Herramienta

Parametros        UserProfileId:Id de cruce entre usuario y perfil
				      ProfileId:Identificador unico de perfil
					     UserId:Identificador unico del usuario
	============================================*/
CREATE PROCEDURE [dbo].[UpdateUserProfile]
    @UserProfileId INT,
    @ProfileId INT,
    @UserId INT
AS
BEGIN
    UPDATE UserProfiles
    SET 
        ProfileId = @ProfileId,
        UserId = @UserId
    WHERE UserProfileId = @UserProfileId;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserStatus]    Script Date: 29/04/2025 2:15:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* =============================================

-- Autor: Daniel Felipe Leon Higuera
-- Create date: 20241227
-- Description: Creación del procedimiento [dbo].[UpdateUserStatus] LoginUser con verificación de contraseña encriptada
				
-- Parametros: UserId: Identificador de Usuario
               IsActive: Campo de validacion de registro activo o inactivo 

 =============================================*/
CREATE PROCEDURE [dbo].[UpdateUserStatus]
  @UserId INT,
  @IsActive BIT
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE Users
  SET IsActive = @IsActive
  WHERE UserId = @UserId;
END;
GO
