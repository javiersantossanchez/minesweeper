#!/bin/sh

npx -p  @angular/cli npm run  --prefix  minesweeper-app  build
mv minesweeper-app/dist  minesweeper.infrastructure/.
docker build -t javierdavidsantos/minesweeper minesweeper.infrastructure/. 
