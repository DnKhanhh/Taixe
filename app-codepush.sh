# /* Current not use
# File: app-codepush
# Author: Margosh Le
# Date: 2021-08-13
# Purpose: Script run command to the update code of application on Store
# Example: ./app-codepush codepush:android Production 3.1.2
# P/S: version update must matching with versionName in Android project and version build in IOS project
#  */ 

if [ "$1" != "" ]; then
    if [ "$1" == "codepush:ios" ]; then
        if [ "$2" == "" ]; then
            echo "command incorrect ./app-codepush codepush:ios <deployment name: Staging or Production> <target version>"
            exit 1
        fi

        if [ "$3" == "" ]; then
           echo "command incorrect ./app-codepush codepush:ios <deployment name: Staging or Production> <target version>"
           exit 1
        fi
        
        echo "================= rm -rf codepush ==========="
        rm -rf codepush
        echo "================= mkdir codepush ==========="
        mkdir codepush
        echo "================= node node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file index.js --bundle-output codepush/main.jsbundle --assets-dest codepush ==========="
        node node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file index.js --bundle-output codepush/main.jsbundle --assets-dest codepush
        echo "================= appcenter codepush release -d $2 -a PSA-Solution/TTC_TaiXe_IOS -c ./codepush -t $3 ==========="
        appcenter codepush release -d $2 -a PSA-Solution/TTC_TaiXe_IOS -c ./codepush -t $3 
    fi

    if [ "$1" == "codepush:android" ]; then
        if [ "$2" == "" ]; then
            echo "command incorrect ./app-codepush codepush:android <deployment name: Staging or Production> <target version>"
            exit 1
        fi

        if [ "$3" == "" ]; then
           echo "command incorrect ./app-codepush codepush:android <deployment name: Staging or Production> <target version>"
           exit 1
        fi
        
        echo "================= rm -rf codepush ==========="
        rm -rf codepush
        
        echo "================= mkdir codepush ==========="
        mkdir codepush
        
        echo "================= node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output codepush/index.android.bundle --assets-dest codepush ==========="
        node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output codepush/index.android.bundle --assets-dest codepush
        
        echo "================= appcenter codepush release -d $2 -a PSA-Solution/TTC_TaiXe_Android -c ./codepush -t $4 ==========="
        appcenter codepush release -d $2 -a PSA-Solution/TTC_TaiXe_Android -c ./codepush -t $3 
    fi
    exit 1
fi
