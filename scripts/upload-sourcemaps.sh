# Assumes you're in a git repository
export ORG=metastartup
export PROJECT=sentry-demo
export VERSION=0.0.2

sentry-cli releases --org "$ORG" new --project "$PROJECT" "$VERSION"

sentry-cli releases --org "$ORG" --project "$PROJECT" set-commits --auto "$VERSION"

sentry-cli releases --org "$ORG" --project "$PROJECT" files "$VERSION" upload-sourcemaps ./dist/"$PROJECT"/ --rewrite --strip-common-prefix

sentry-cli releases --org "$ORG" --project "$PROJECT" finalize "$VERSION"
