#  Copyright (c) 2016 doo GmbH. All rights reserved.

function sbsdkecho {
    echo "[ScanbotSDK] $1"
}

function codeSignIfNeeded {
    if [ "$CODE_SIGNING_REQUIRED" == "YES" ]; then
            sbsdkecho "Code signing $1 using identity \"$EXPANDED_CODE_SIGN_IDENTITY_NAME\""
            /usr/bin/codesign --force --sign "$EXPANDED_CODE_SIGN_IDENTITY" --preserve-metadata=identifier,entitlements "$1"
    fi
}

function stripBinary {
    binary="$1"
    architectures=$(lipo -info "$binary" | rev | cut -d ':' -f1 | rev)
    strippedArchitectures=""
    for arch in $architectures; do
        if [[ "$VALID_ARCHS" != *"$arch"* ]]; then
            lipo -remove "$arch" -output "$binary" "$binary" || exit 1
            strippedArchitectures="$strippedArchitectures $arch"
        fi
    done
    sbsdkecho "$strippedArchitectures"
}

function processFiles {
    frameworkFolder="$1"
    if [ "$ACTION" == "install" ]; then
        sbsdkecho "Removing script"
        rm -f "$frameworkFolder/strip-SBSDK-Framework.sh"
        sbsdkecho "Moving BCSymbolMaps"
        find "$frameworkFolder/BCSymbolMaps" -name '*.bcsymbolmap' -type f -exec mv {} "$CONFIGURATION_BUILD_DIR" \;
    fi
    rm -rf "$frameworkFolder/BCSymbolMaps"
}

function processDebugSymbols {
    sbsdkecho "Copying dSYMs..."
    if [ -n "$SCRIPT_INPUT_FILE_0" ]; then
        symbolsSourcePath="$SCRIPT_INPUT_FILE_0"
        symbolsSourceBinary="$symbolsSourcePath/Contents/Resources/DWARF/ScanbotSDK"

        if [[ $(file "$symbolsSourceBinary") != *"dSYM companion file"* ]]; then
            sbsdkecho "dSYM folder doesn't contain binary: $symbolsSourcePath"
            exit 2
        fi
        
        symbolsTargetPath=$(basename "$symbolsSourcePath")
        sbsdkecho "Copying dSYMs to $BUILT_PRODUCTS_DIR/$symbolsTargetPath"
        if [ ! -d "$BUILT_PRODUCTS_DIR/$symbolsTargetPath" ]; then
            cp -rf "$symbolsSourcePath" "$BUILT_PRODUCTS_DIR"
            sbsdkecho "Copied dSYMs into products directory"
        fi
    fi
}

function runScript {
    frameworkFolder=$1
    frameworkBinary="$frameworkFolder/ScanbotSDK"
    processFiles "$frameworkFolder"
    strippedArchitectures=$(stripBinary "$frameworkBinary")
    
    if [[ -n "$strippedArchitectures" ]]; then
        sbsdkecho "Removed architectures from ScanbotSDK framework: $strippedArchitectures"
        codeSignIfNeeded "$frameworkBinary"
    fi
    processDebugSymbols
}

cd "$BUILT_PRODUCTS_DIR/$FRAMEWORKS_FOLDER_PATH"
folder="./ScanbotSDK.framework"
runScript "$folder"
