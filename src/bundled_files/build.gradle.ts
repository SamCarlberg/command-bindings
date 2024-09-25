import { unindent } from "../codegen/java/util"

export const BundledGradleBuild = unindent(`
    plugins {
        id "java"
        id "edu.wpi.first.GradleRIO" version "2025.0.0-alpha-2"
    }

    wpi.maven.useLocal = false
    wpi.maven.useDevelopment = true
    wpi.versions.wpilibVersion = '2025.+'
    wpi.versions.wpimathVersion = '2025.+'

    repositories {
        mavenLocal()
    }

    java {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    def ROBOT_MAIN_CLASS = "frc.robot.Main"

    // Define my targets (RoboRIO) and artifacts (deployable files)
    // This is added by GradleRIO's backing project DeployUtils.
    deploy {
        targets {
            roborio(getTargetTypeClass('RoboRIO')) {
                // Team number is loaded either from the .wpilib/wpilib_preferences.json
                // or from command line. If not found an exception will be thrown.
                // You can use getTeamOrDefault(team) instead of getTeamNumber if you
                // want to store a team number in this file.
                team = project.frc.getTeamNumber()
                debug = project.frc.getDebugOrDefault(false)

                artifacts {
                    // First part is artifact name, 2nd is artifact type
                    // getTargetTypeClass is a shortcut to get the class type using a string

                    frcJava(getArtifactTypeClass('FRCJavaArtifact')) {
                    }

                    // Static files artifact
                    frcStaticFileDeploy(getArtifactTypeClass('FileTreeArtifact')) {
                        files = project.fileTree('src/main/deploy')
                        directory = '/home/lvuser/deploy'
                    }
                }
            }
        }
    }

    def deployArtifact = deploy.targets.roborio.artifacts.frcJava

    // Set to true to use debug for JNI.
    wpi.java.debugJni = false

    // Set this to true to enable desktop support.
    def includeDesktopSupport = true

    // Defining my dependencies. In this case, WPILib (+ friends), and vendor libraries.
    // Also defines JUnit 5.
    dependencies {
        annotationProcessor wpi.java.deps.wpilibAnnotations()

        implementation wpi.java.deps.wpilib()
        implementation wpi.java.vendor.java()

        roborioDebug wpi.java.deps.wpilibJniDebug(wpi.platforms.roborio)
        roborioDebug wpi.java.vendor.jniDebug(wpi.platforms.roborio)

        roborioRelease wpi.java.deps.wpilibJniRelease(wpi.platforms.roborio)
        roborioRelease wpi.java.vendor.jniRelease(wpi.platforms.roborio)

        nativeDebug wpi.java.deps.wpilibJniDebug(wpi.platforms.desktop)
        nativeDebug wpi.java.vendor.jniDebug(wpi.platforms.desktop)
        simulationDebug wpi.sim.enableDebug()

        nativeRelease wpi.java.deps.wpilibJniRelease(wpi.platforms.desktop)
        nativeRelease wpi.java.vendor.jniRelease(wpi.platforms.desktop)
        simulationRelease wpi.sim.enableRelease()

        testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'
        testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
    }

    test {
        useJUnitPlatform()
        systemProperty 'junit.jupiter.extensions.autodetection.enabled', 'true'
    }

    // Simulation configuration (e.g. environment variables).
    wpi.sim.addGui().defaultEnabled = true
    wpi.sim.addDriverstation()

    // Setting up my Jar File. In this case, adding all libraries into the main jar ('fat jar')
    // in order to make them all available at runtime. Also adding the manifest so WPILib
    // knows where to look for our Robot Class.
    jar {
        from { configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) } }
        from sourceSets.main.allSource
        manifest edu.wpi.first.gradlerio.GradleRIOPlugin.javaManifest(ROBOT_MAIN_CLASS)
        duplicatesStrategy = DuplicatesStrategy.INCLUDE
    }

    // Configure jar and deploy tasks
    deployArtifact.jarTask = jar
    wpi.java.configureExecutableTasks(jar)
    wpi.java.configureTestTasks(test)

    // Configure string concat to always inline compile
    tasks.withType(JavaCompile) {
        options.compilerArgs.add '-XDstringConcat=inline'
    }
`).trim()
