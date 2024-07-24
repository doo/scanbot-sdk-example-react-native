#!/bin/bash
set -e;

# Define the property and its values
PROPERTY="newArchEnabled"
TRUE_VALUE="true"
FALSE_VALUE="false"

# Check for command line arguments
if [ "$#" -eq 1 ]; then
    # Check for the provided argument
    case "$1" in
        "--new")
            NEW_VALUE="$TRUE_VALUE"
            ;;
        "--old")
            NEW_VALUE="$FALSE_VALUE"
            ;;
        *)
            echo "Invalid argument: $1"
            echo "Usage: $0 [--new|--old]"
            exit 1
            ;;
    esac
else
    echo "Please set the desired architecture"
    echo "Usage: $0 [--new|--old]"
    exit 1
fi

# Debug info
echo "Setting NEW_ARCHITECTURE to $NEW_VALUE!"

cd android

# Define the path to the gradle.properties file
FILE_PATH="gradle.properties"

# Replace the line in the file using a different delimiter
sed -i '' "s/^$PROPERTY=.*/$PROPERTY=$NEW_VALUE/" "$FILE_PATH"
echo "Updated $PROPERTY to $NEW_VALUE in $FILE_PATH"

# Clean the gradle
rm -rf .gradle
rm -rf app/.cxx
./gradlew clean

cd ..


# Re-install iOS with the specified architecture
cd ios

rm -f Podfile.lock
rm -rf Pods
if [ "$NEW_VALUE" = "$TRUE_VALUE" ]; then
    RCT_NEW_ARCH_ENABLED=1 bundle exec pod install --repo-update
else
    pod install --repo-update
fi

cd ..
