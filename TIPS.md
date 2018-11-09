# File system
## configuration
For handling the requirement.txt file run

$ pip freeze > requirements.txt

based on https://github.com/henriquebastos/python-decouple

from decouple import config

hide the configuration with a settings.ini file next to settings.py 

# REACT
## Directories considerations
Many tutorial recommand to have different folders for installing different apps.
Besides, they recommend to be in a subfolder generally named 'frontednd'.
By doing this, the problem are
- we can not share the different parts of the projects
- we install many times the Nodes Modules
- we end up with HUGE builds

So, we should have the folders directly accessible:
- src
- build
- public

## Installation
Most of the work is done with creact-react-app. We need to eject

Some nice template is available from CoreUI

## Webpack adjustments
In order to have multiple entry points, the scripts have been adapted. the name of the entries has to be kept in order to invoke them.
Nevertheless some additionnal integration need to be done
The main entry points are described in congig/paths.js


## Integrating React and Django
using django-webpack-loader a django application which injects link and script tag for the bundles which webpack generates dynamically.
could be used BUT there is a problem with the bundle
- don't use chunks for the moment as it prevent the work
- use directely the integration of the different apps by invoking the js that will mount on the DOM

## 
