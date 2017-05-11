/**
 * Velocity Effects
 *
 * A few Registered effects for velocity's ui kit
 *
 * @see js/components/_velo-slider.js
 * @see js/vendor/_velocity.js
 */

var scaleDownAmnt = 0.7;
var boxShadowAmnt = '40px';

$.Velocity.RegisterEffect("translateUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-100%'
    }, 1]
  ]
});
$.Velocity.RegisterEffect("translateDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '100%'
    }, 1]
  ]
});
$.Velocity.RegisterEffect("translateNone", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0',
      opacity: '1',
      scale: '1',
 
    }, 1]
  ]
});
//scale down
$.Velocity.RegisterEffect("scaleDown", {
  defaultDuration: 1,
  calls: [
    [{
      opacity: '0',
      scale: '0.7',
 
    }, 1]
  ]
});

//gallery
$.Velocity.RegisterEffect("scaleDown.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
 
    }, 0.20],
    [{
      translateY: '-100%'
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-100%',
      scale: scaleDownAmnt,
 
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '90%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt     
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.20],
    [{
      translateY: '100%'
    }, 0.60],
    [{
      translateY: '100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveDown.scroll", {
  defaultDuration: 1,
  calls: [
    [{

    }, 0.60],
    [{
      translateY: '100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-90%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("hide.scaleDown", {
  defaultDuration: 1,
  calls: [
    [{
      opacity: '0',
      scale: '0.8'
    }, 1]
  ]
});