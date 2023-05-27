#! /usr/bin/bash
npx prisma generate
pm2-runtime /home/webapp/index.js