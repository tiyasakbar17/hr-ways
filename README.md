# Tiyas Hr Ways

This project was created for the test from PIAREA.

## How To Run This Project

In the project directory, you should run:

### `npm run create`

This command will create the database needed for the Aplication.\
Make sure you run your Database such as MySQL.

You can configure the database name, username and password at `config` folder.

### `npm run migrate`

This command will create the tables for the Application.\
Make sure you run `npm run create` before.

### `npm run seed`

This command will create the user to use as the default usename and password for the Application.\
`tiyasakbar` is the default username and password for the admin.

You can configure the default user and the role from at `seeders`folder.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.