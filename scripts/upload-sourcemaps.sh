VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)
ORG=metastartup
PROJECT=sentry-demo

npm run build:prod

sentry-cli releases --org "$ORG" new --project "$PROJECT" "$VERSION"

sentry-cli releases --org "$ORG" --project "$PROJECT" set-commits --auto "$VERSION"

sentry-cli releases --org "$ORG" --project "$PROJECT" files "$VERSION" upload-sourcemaps ./dist/"$PROJECT"/ --rewrite --strip-common-prefix

sentry-cli releases --org "$ORG" --project "$PROJECT" finalize "$VERSION"
