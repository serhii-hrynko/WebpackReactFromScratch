cd ../
:: docker run --rm -it -p 3000:3000 -v ${pwd}/env.js:/app/env.js webpackreactfromscratch
docker run --rm -it -p 3000:3000 -v %cd%/env.js:/app/env.js webpackreactfromscratch
