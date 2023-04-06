#!/usr/bin/env bash
[[ -z "${BASE}" ]] && {
  echo '$BASE is empty'
  exit 1
}
[[ -z "${VERSION}" ]] && {
  echo '$VERSION is empty'
  exit 1
}
[[ -z "${RELEASE}" ]] && {
  echo '$RELEASE is empty'
  exit 1
}

set -xe

sdir=svn

if [[ -d "${sdir}/.svn" ]]; then
  cd ${sdir}
  svn up -q
else
  svn co -q "https://plugins.svn.wordpress.org/$BASE" ${sdir}
  cd ${sdir}
fi

rm -rf ./trunk
unzip -q ../${RELEASE}
mv ./${BASE} trunk

# updating
svn add -q --force --auto-props --parents --depth infinity trunk/*
if [[ -d tags/"${VERSION}" ]]; then
  svn rm tags/"${VERSION}"
  rm -rf tags/"${VERSION}"
fi
svn cp trunk tags/"${VERSION}"
svn stat
svn ci -q -m "update ${VERSION}" --username "${USERNAME}" --password "${PASSWORD}"
