# Assumes you're in a git repository
export ORG=metastartup
export PROJECT=sentry-demo
export $VERSION=0.0.1

sentry-cli releases --org $ORG new --project $PROJECT $VERSION

sentry-cli releases set-commits --auto $VERSION

sentry-cli releases --org metastartup --project sentry-demo files 0.0.1 upload-sourcemaps ./dist/my-dream-app/ --rewrite --strip-common-prefix

sentry-cli releases finalize $VERSION
