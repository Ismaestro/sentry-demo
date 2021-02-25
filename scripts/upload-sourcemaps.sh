VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)
REPOSITORY_URL=git@github.com:Ismaestro/sentry-demo.git

export SENTRY_ORG=metastartup
export SENTRY_PROJECT=sentry-demo

#npm run build:prod

sentry-cli releases new "$SENTRY_PROJECT@$VERSION"

sentry-cli releases set-commits --auto "$SENTRY_PROJECT@$VERSION"

sentry-cli releases files "$SENTRY_PROJECT@$VERSION" upload-sourcemaps ./dist/"$PROJECT"/ --strip-common-prefix

sentry-cli releases finalize "$SENTRY_PROJECT@$VERSION"
