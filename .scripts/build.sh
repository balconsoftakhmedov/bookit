#!/usr/bin/env bash
set -xe;
npm install --no-audit
npm run prod

# freemius SDK
freemius_tag=2.4.5
wget -O freemius.zip https://github.com/Freemius/wordpress-sdk/archive/refs/tags/${freemius_tag}.zip
unzip freemius.zip
mv ./wordpress-sdk-${freemius_tag} ./libs/freemius
rm -f freemius.zip ./freemius/LICENSE.txt ./freemius/package.json ./freemius/README.md

# freemius contact
contact_file=libs/freemius/templates/contact.php
wget -O ${contact_file} https://bitbucket.org/stylemixthemes/freemius-contact/raw/master/contact.php
cat ${contact_file} \
	| awk "{sub(/%DOCUMENTATION_URL%/,\"${DOCUMENTATION_URL}\")}1" \
	| awk "{sub(/%VIDEO_URL%/,\"${VIDEO_URL}\")}1" \
	| awk "{sub(/%SUPPORT_URL%/,\"${SUPPORT_URL}\")}1" \
	> tmp.php
mv tmp.php ${contact_file}