# Gulpfile generator
I love _using_ Gulp. Writing gulpfiles, though? Not so much. 

So, this is a script written in Python that will take a YAML configuration file and generate a gulpfile for you. A 272 line gulpfile becomes a 77-line YAML file; no need to worry about too much implementation detail.

To run it, it's best that you add the script (**gulpgenerator**) to your PATH. It will look in the current working directory for a **gulpconfig.yaml** file and then generate the gulpfile accordingly.

If there is not a package.json file in the current working directory, it will create one. It will save all dependent files (e.g. gulp, gulp-concat, etc) as a development dependency. If a package of the same name is already installed, it will not reinstall it.

An example gulpconfig.yaml file and generated gulpfile + package.json is in the **examples/basic** folder. 

To test it out for yourself, go to **examples/basic_starter** in your terminal then run `gulpfilegenerator` (assuming the script is in your PATH!). A new package.json file and a new gulpfile.js should be created, and the necessary packages will also be installed as well. 

**examples/advanced** has a more complete example (e.g. including typescript use).

##This is still under construction, but please feel free to add modules, add improvements, or suggest features etc.

----
##Currently Supported:
* LESS
* React (+Mocha)
* Typescript
* Javascript (js)/CSS (css) concatenation
* ESlint
* Nodemon
* Browser-sync

---
### Todo:
* make browser-sync more flexible (move config into YAML file)
* SASS
* Angular
* Mocha (standalone)
* Typings declaration in YAML file (for typescript)