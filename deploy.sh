#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd src/.vuepress/dist

git init
git add -A
git commit -m 'deploy'


git push -f https://github.com/ru12321/ru12321.github.io.git master:gh-pages

