import { unindent } from "../codegen/java/util"

export const BundledGitignore = unindent(`
  # This gitignore has been specially created by the WPILib team.
  # If you remove items from this file, intellisense might break.

  ### C++ ###
  # Prerequisites
  *.d

  # Compiled Object files
  *.slo
  *.lo
  *.o
  *.obj

  # Precompiled Headers
  *.gch
  *.pch

  # Compiled Dynamic libraries
  *.so
  *.dylib
  *.dll

  # Fortran module files
  *.mod
  *.smod

  # Compiled Static libraries
  *.lai
  *.la
  *.a
  *.lib

  # Executables
  *.exe
  *.out
  *.app

  ### Java ###
  # Compiled class file
  *.class

  # Log file
  *.log

  # BlueJ files
  *.ctxt

  # Mobile Tools for Java (J2ME)
  .mtj.tmp/

  # Package Files #
  *.jar
  *.war
  *.nar
  *.ear
  *.zip
  *.tar.gz
  *.rar

  # virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
  hs_err_pid*

  ### Linux ###
  *~

  # temporary files which can be created if a process still has a handle open of a deleted file
  .fuse_hidden*

  # KDE directory preferences
  .directory

  # Linux trash folder which might appear on any partition or disk
  .Trash-*

  # .nfs files are created when an open file is removed but is still being accessed
  .nfs*

  ### macOS ###
  # General
  .DS_Store
  .AppleDouble
  .LSOverride

  # Icon must end with two \r
  Icon

  # Thumbnails
  ._*

  # Files that might appear in the root of a volume
  .DocumentRevisions-V100
  .fseventsd
  .Spotlight-V100
  .TemporaryItems
  .Trashes
  .VolumeIcon.icns
  .com.apple.timemachine.donotpresent

  # Directories potentially created on remote AFP share
  .AppleDB
  .AppleDesktop
  Network Trash Folder
  Temporary Items
  .apdisk

  ### VisualStudioCode ###
  .vscode/*
  !.vscode/settings.json
  !.vscode/tasks.json
  !.vscode/launch.json
  !.vscode/extensions.json

  ### Windows ###
  # Windows thumbnail cache files
  Thumbs.db
  ehthumbs.db
  ehthumbs_vista.db

  # Dump file
  *.stackdump

  # Folder config file
  [Dd]esktop.ini

  # Recycle Bin used on file shares
  $RECYCLE.BIN/

  # Windows Installer files
  *.cab
  *.msi
  *.msix
  *.msm
  *.msp

  # Windows shortcuts
  *.lnk

  ### Gradle ###
  .gradle
  /build/

  # Ignore Gradle GUI config
  gradle-app.setting

  # Avoid ignoring Gradle wrapper jar file (.jar files are usually ignored)
  !gradle-wrapper.jar

  # Cache of project
  .gradletasknamecache

  # # Work around https://youtrack.jetbrains.com/issue/IDEA-116898
  # gradle/wrapper/gradle-wrapper.properties

  # # VS Code Specific Java Settings
  # DO NOT REMOVE .classpath and .project
  .classpath
  .project
  .settings/
  bin/

  # IntelliJ
  *.iml
  *.ipr
  *.iws
  .idea/
  out/

  # Fleet
  .fleet

  # Simulation GUI and other tools window save file
  *-window.json

  # Simulation data log directory
  logs/

  # Folder that has CTRE Phoenix Sim device config storage
  ctre_sim/
`).trim()
