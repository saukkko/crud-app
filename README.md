# Setup

Note: `npm i` does not install client deps by default.

1. Obtain `secrets.json` containing service account credentials for firestore
2. `echo 'PRIVATE_KEY="<private_key_for_service_account>"' > server/.env && chmod 600 server/.env`
3. `git clone [this repository]`
4. `npm install`
5. `npm install --prefix client`
6. `npm run build --prefix server` (or just `npm run build` to build client as well)
7. `npm run devstart`
8. server will listen port 53000 by default and client usually port 3000.
9. try opening http://localhost:3000

# Issues

For some reason firestore authentication does not work on unix systems. Probably badly formatted path and/or wrong line feed character and/or quotation mark error.
