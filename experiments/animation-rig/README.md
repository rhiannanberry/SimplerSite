# :dancer: Animation Rig :dancer:

[Live Demo](https://rhiannan.online/experiments/animation-rig)

Quick and dirty example of how you can associate the animations of one FBX to the mesh/rig of a different FBX (given that they have the same armature/bones)

**animation-rig** is essentially just **animation-mixer** with additional functionality to attatch animations asynchronously.

**rig-control** contains the method that loads our separate FBXs for their animations. Very rough and hard-coded, but could easily be cleaned up in a way that let's you iterate over an organized list of animation FBXs. Said FBXs can contain one or multiple animations, so you can put all 'walk' animations into one file for organization purposes, or into separate files if ability to load them asynchronously is more important. Also, no, the idle animation isn't broken, it's just ugly.
