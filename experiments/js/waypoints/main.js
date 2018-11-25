var prevData = "clip: idle; crossFadeDuration: .3";;
var listenerAdded = false;
var scene = document.querySelector('a-scene');
var playOnce = false;
var sceneT = null;

function updateWaypoints() {
  var sidelength = document.getElementById("sidelength").value;
  var sidecount = document.getElementById("sidecount").value;
  var wpSystem = document.getElementById("test");
  console.log(wpSystem.components.triangle-waypoint-group);
};

AFRAME.registerComponent('triangle-waypoint-group', {
  schema: {
    sidecount: {default: 5, type: 'number'}, //12 edge points
    sidelength: {default: 5, type: 'number'},
    trigger: {type: 'string'},
    range: {default: 1, type: 'number'}
  },

  init: function() {
    var trigger = this.data.trigger;
    var distFromCenter = Math.sqrt(Math.pow(this.data.sidelength, 2) - Math.pow(this.data.sidelength/2, 2));
    var vertexA = new THREE.Vector3(0,0,distFromCenter/2);
    var vertexB = new THREE.Vector3(-this.data.sidelength/2,0,-distFromCenter/2);
    var vertexC = new THREE.Vector3(this.data.sidelength/2,0,-distFromCenter/2);

    this.waypoints =  this.el.children;
    for (i=0; i <this.waypoints.length; i++) {
      var waypoint = this.waypoints[i];
      
      waypoint.setAttribute("id", "wp"+i);
      waypoint.setAttribute("waypoint","");
      waypoint.components.waypoint.data.trigger=trigger;
      waypoint.components.waypoint.data.range=this.data.range;
    
      if (i < this.data.sidecount-1) { //A to B
        var alpha = (i)%(this.data.sidecount)/(this.data.sidecount-1);
        waypoint.object3D.position.addVectors(new THREE.Vector3(0,0,0), vertexA);

        if (i != 0) {
          waypoint.object3D.position.lerp(vertexB, alpha);
          //
        }

      } else if (i < (this.data.sidecount-1)*2) { //B to C
        var alpha = (i-(this.data.sidecount-1))/(this.data.sidecount-1);
        waypoint.object3D.position.addVectors(new THREE.Vector3(0,0,0), vertexB);
        
        if (i != this.data.sidecount-1) {
          waypoint.object3D.position.lerp(vertexC, alpha);
        } 

      } else if (i < (this.data.sidecount-1)*3) { //C to A
        var alpha = (i-(2*(this.data.sidecount-1)))/(this.data.sidecount-1);
        waypoint.object3D.position.addVectors(new THREE.Vector3(0,0,0), vertexC);

        if (i != (this.data.sidecount-1)*2) {
          waypoint.object3D.position.lerp(vertexA, alpha);
        }
        
      }
      console.log(waypoint.object3D.position);
      if (i == 0) {
        waypoint.object3D.visible = true;
      } else {
        waypoint.object3D.visible = false;
      }
      if (i+1 < this.waypoints.length) {
        waypoint.components.waypoint.data.next = this.waypoints[i+1];
      }
    }
  },
  innerTriangle: function() {

  },
  reload: function() {
    this.init();
  }
});

AFRAME.registerComponent('waypoint',{
  schema: {
    vis: {default: false, type: 'boolean'},
    activated: {default: false, type: 'boolean'},
    trigger: {type: 'string'},
    range: {default: 1, type: 'number'}
  },

  init: function() {
    this.el.setAttribute('visible', false);
    this.data.next = null;
    this.data.trigger="";
    console.log("init");
  },
  tick: function(time, deltaTime) {

    if (!this.triggerObj) {
      this.triggerObj = document.querySelector(this.data.trigger);
    }
    
    if (this.triggerObj && this.el.object3D.visible && !this.data.activated) {
      var directionVec = new THREE.Vector3();

      var triggerPosition = this.triggerObj.object3D.position;
      var currentPosition = (new THREE.Vector3()).copy(this.el.object3D.position);

      var realPosition = this.el.parentElement.object3D.localToWorld(currentPosition);

      directionVec.copy(triggerPosition).sub(realPosition);

      var distance = directionVec.length();

      if (Math.abs(distance) <= this.data.range) {
        this.activate();
      }
    }
  },

  activate: function() {
    //do activation stuff
    this.data.activated = true;
    if(this.data.next) {
      this.data.next.object3D.visible = true;
    }
  }
  
});

AFRAME.registerComponent('rig-control', {
  schema: {
    default: ''
  },

  init: function () {
    var avatar = document.querySelector('#test');
    var scene = document.querySelector('a-scene');
    var self = this;
    var model = avatar.getObject3D('mesh');
    //console.log("hi");

    if (model) {
      self.loadAnimationsFBX(model, '../models/fbx/samba anims.fbx');
    } else {
      avatar.addEventListener('model-loaded', function () {
        model = avatar.getObject3D('mesh');
        self.loadAnimationsFBX(model, '../models/fbx/samba anims.fbx');
      })
    }

    document.addEventListener('keydown', function (e) {
      if (e.key == '1') {
        console.log('idle');
        avatar.setAttribute('animation-rig', 'clip: Armature|idle; crossFadeDuration: .3;');
      } else if (e.key == '2') {
        console.log('dance');
        avatar.setAttribute('animation-rig', 'clip: Armature|dance; crossFadeDuration: .3;');
      }
    });
  },

  loadAnimationsFBX: function (model, filename) {
    var loader = new THREE.FBXLoader();
    loader.load(filename, function (object) {
      if (!object.animations) {
        console.warn('animation fbx does not contain animations!');
        return;
      }
      if (object.animations.constructor === Array) {
        model.animations = model.animations.concat(object.animations);
      } else {
        model.animations.push(object.animations);
      }
      console.log(model);
    });
  }


});