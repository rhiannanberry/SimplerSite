var prevData = "clip: idle; crossFadeDuration: .3";;
var listenerAdded = false;
var scene = document.querySelector('a-scene');
var playOnce = false;
var sceneT = null;

AFRAME.registerComponent('rig-control', {
  schema: {
    default: ''
  },

  init: function () {
    var avatar = document.querySelector('#test');
    var scene = document.querySelector('a-scene');
    var self = this;
    var model = avatar.getObject3D('mesh');

    if (model) {
      self.loadAnimationsFBX(model, '/experiments/models/fbx/samba anims.fbx');
    } else {
      avatar.addEventListener('model-loaded', function () {
        model = avatar.getObject3D('mesh');
        self.loadAnimationsFBX(model, '/experiments/models/fbx/samba anims.fbx');
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