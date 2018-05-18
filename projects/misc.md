---
title: Miscellaneous
permalink: /projects/misc/
layout: project_page
root: projects
---
# Description #
There's plenty of things I've created or built that I wouldn't call a "project", or things that I've helped create, but would be disengenuous in saying that those were in any way projects that I owned. So for now, I'll put all of those things here!

## Rat App #
In a class at Georgia Tech, I was required to build a mock Android app for the purpose of tracking and recording rat sightings across the US. Most of that project was uninspired Java and unpleasant Android development, but I also got the chance to build this service on another platform for bonus points.

I, of course, chose to gameify it and build a first-person 3D version of the app in Unity. It was only partially complete (full implementation was not required), but the things that were implemented include: creation of multiple 3D assets, a simplistic 3D environment, and an animated character model. Firebase access was also partially implemented, as was a dialogue tree, and environments for visualizing the collected data in different ways (graphed or on a geographic map) for different spans of time. 

Visualizing the coordinates on a map was the most interesting aspect of this, as the Google Maps library was no longer officially available in Unity. So the process involved using a static image of the whole US, and placing 3D pins in the correct spot via complicated conversion from real lat/lon coordinates, to pixel coordinates based on the area in the map image, and then to Unity worldspace coordinates. I may end up writing in more detail on this and my general hatred of map projections in more detail, in which case I will link to that. 

#### Screenshots #

---
## Squid Racers #
This is the first game I helped with in [VGDev](http://vgdev.com) during my first semester at Georgia Tech. My contribution was this really fabulously modeled and rigged squid: 

