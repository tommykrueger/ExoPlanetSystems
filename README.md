# Exoplanets App

A web application to visualize exoplanet data. The data is based on PHL's
[Habitable Exoplanets Catalog](http://phl.upr.edu/projects/habitable-exoplanets-catalog/data/database) which basically provides almost every exoplanet data available combined with additional planet related modelled information.

### Getting Started

Visit [http://exoplanets.tommykrueger.com/app](http://exoplanets.tommykrueger.com/app) to see the app.
Open [http://exoplanets.tommykrueger.com](http://exoplanets.tommykrueger.com) to see app description.

### Usage

#### Frontend

1. Clone the repository with command: git clone https://github.com/tommykrueger/exoplanets
2. Open index.html file inside of the root directory in your browser - have fun!

#### Backend

1. If you want to import a new dataset of exoplanets you need to setup a SQL database on your server first.
2. Open  your sql storage software installed on your system (phpmyadmin, adminer or any similar)
3. Create new database "exoplanets" and remember the name
4. Use the exported phlplanets.sql inside the folder backend/ and import it into your database
5. Now you can go to (http://phl.upr.edu/projects/habitable-exoplanets-catalog/data/database) and download the latest CSV-File to import it into the database
6. Once import is complete you can call backend ressources from within your browser. It is important to keep existing directory structure as is, otherwise file generation may fail.

	* Use <b>Export Planets</b> to generate all planet system files. Files will be generated as JSON files inside of your app/js/data/planetsystems/ directory.

	* Use <b>Export Stars</b> to generate all stars information. It's one JSON file that will be stored to app/js/data/.

	* Use <b>Export Planet Stats</b> to generate a list of statistical planet information. It's one JSON file that will be stored to app/js/data/.

	* Use <b>Export General Statistics</b> to generate a list of basic of statistics of planets and stars. It's one JSON file that will be stored to app/js/data/.

