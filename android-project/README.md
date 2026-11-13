# Student Companion Android 6.0+ APK Project

- **Package ID**: `com.studentcompanion.app`
- **Minimum Android**: Android 6.0 Marshmallow (`minSdk 23`)
- **Target Android**: Android 14 (`targetSdk 34`)

## Option A: Build Signed Release APK in Android Studio
1. Open the `android-project` folder in **Android Studio**.
2. Wait for Gradle Sync to complete.
3. Click **Build -> Generate Signed Bundle / APK -> APK**.
4. Choose or create your release keystore and select `release` build variant.
5. Install the resulting `app-release.apk` (multi-MB compiled binary) on any Android 6.0+ device.

## Option B: Command-Line Debug / Release APK
```bash
# With Android SDK + Java 17 installed:
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk
```
