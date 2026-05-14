README text

Here is a simple English README text without code fences, exactly as requested:
Recipe App

A full-stack recipe management application built with Next.js, Prisma, PostgreSQL, and Docker. The app allows users to create, view, edit, and delete recipes through a simple interface.
Features

    Create new recipes

    View all recipes

    Edit existing recipes

    Delete recipes

    PostgreSQL database with Prisma ORM

    Dockerized setup for easy local execution

Tech Stack

    Next.js

    TypeScript

    Prisma ORM

    PostgreSQL

    Docker

    Docker Compose

Running the project

    Clone the repository

git clone https://github.com/MarkoDabro/Recepti

    Open the project folder

cd recepti

    Start the application with Docker

docker compose up --build

    Open the application in the browser

http://localhost:3000

for Prisma(database ) managmet

    npx prisma studio
    
if i doesnt work do

    npm install

Notes

    The PostgreSQL database starts automatically through Docker Compose.

    Prisma migrations are applied when the application starts.

    No manual PostgreSQL installation is required.
