# The-Pac-Man-in-JS
The Pac-Man in JavaScript. Use in my website: http://www.vgp-wd.com/demos/pac-man

	Auteur : Valentin Chéneau
	Date de création : novembre 2018

	Interessé par mes projets ?
	Vous aimez mon code source ?

	Contactez-moi! ;)
	Email: cheneau.valentin@outlook.fr

============= Concepts Used =============

=== JS ===

 . Function callbacks
   setInterval() used to refresh game, setTimeOut() used to pause screen 
   shortly during countdown to start.

 . Anonymous function
   Used with setTimeOut during countdown.

 . Optional parameters
   Run() takes an optional parameter of isGodMode to determine whether or not
   to enter god mode.

 . Arrays
   Used for constructing game board grids (2-D array), keeping record of ghosts
   and lives left, and an assortment of other various elements.

 . Objects
   Pacman, ghosts, and grids are all objects. 
   They have constructors, properties, parameters, prototypes, overridden 
   toString() methods, etc.


=== HTML5 Canvas ===

 . Rectangles, rectangles everywhere.
   Used for grids, covering up areas that need to be refreshed, etc.

 . Strokes and fills
   For drawing everything.

 . Paths, arcs, circles
   For drawing Pacman and ghosts.

 . Text
   For showing welcome screen, instructions, and scores.

 . Keyboard events
   Used to make Pacman move.

.............!!! SECRET CHEAT !!!.............
. Press G at start screen to enter GOD MODE. .
..............................................
