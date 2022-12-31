
var isTouch = false;
var motionData = [];
var orientationData = [];

//. iOS 13 対応 : https://bagelee.com/webar-vr/ios13-webar-webvr/
//.             : https://qiita.com/nakakaz11/items/a9be602874bd54819a18
function ClickRequestDeviceSensor(){
  //. ユーザーに「許可」を明示させる必要がある
  DeviceOrientationEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      window.addEventListener( "deviceorientation", deviceOrientation );
      $('#sensorrequest').css( 'display', 'none' );
      $('#cdiv').css( 'display', 'block' );
    }
  }).catch( function( e ){
    console.log( e );
  });

  DeviceMotionEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      window.addEventListener( "devicemotion", deviceMotion );
      $('#sensorrequest').css( 'display', 'none' );
      $('#cdiv').css( 'display', 'block' );
    }
  }).catch( function( e ){
    console.log( e );
  });
}

$(function(){
  init();
});

function init(){
  var canvas = document.getElementById( 'mycanvas' );
  if( !canvas || !canvas.getContext ){
    return false;
  }

  if( window.DeviceOrientationEvent ){
    //. iOS 13 対応 : https://bagelee.com/webar-vr/ios13-webar-webvr/
    //.             : https://qiita.com/nakakaz11/items/a9be602874bd54819a18
    if( DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function' ){
      /*
      DeviceOrientationEvent.requestPermission().then( function( response ){
        if( response === 'granted' ){
          window.addEventListener( "deviceorientation", deviceOrientation );
        }
      }).catch( function( e ){
        console.log( e );
      });
      */
      $('#cdiv').css( 'display', 'none' );
      var banner = '<div id="sensorrequest" onclick="ClickRequestDeviceSensor();" style="z-index:1; position:absolute; width:100%; background-color:#000; color:#fff;><p style="padding:10px;">センサーの有効化</p></div>';
      $('body').prepend( banner );
    }else{
      window.addEventListener( "deviceorientation", deviceOrientation );
    }
  }
  if( window.DeviceMotionEvent ){
    //. iOS 13 対応 : https://bagelee.com/webar-vr/ios13-webar-webvr/
    //.             : https://qiita.com/nakakaz11/items/a9be602874bd54819a18
    if( DeviceMotionEvent.requestPermission && typeof DeviceMotionEvent.requestPermission === 'function' ){
      /*
      DeviceMotionEvent.requestPermission().then( function( response ){
        if( response === 'granted' ){
          window.addEventListener( "devicemotion", deviceMotion );
        }
      }).catch( function( e ){
        console.log( e );
      });
      */
    }else{
      window.addEventListener( "devicemotion", deviceMotion );
    }
  }

  if( window.TouchEvent ){
    canvas.addEventListener( "touchstart", touchStart );
    canvas.addEventListener( "touchend", touchEnd );
  }

  //. リサイズ時に Canvas サイズを変更する
  $(window).on( 'load resize', function(){
    resized();
  });
  resized();

  //. スクロール禁止
  /*
  $(window).on('touchmove.noScroll', function( e ){
    e.preventDefault();
  });
  */
  var movefun = function( event ){
    event.preventDefault();
  }
  window.addEventListener( 'touchmove', movefun, { passive: false } );
}

var canvas_width = 0;
var canvas_height = 0;
function resized(){
  var browserWidth = window.innerWidth;
  var browserHeight = window.innerHeight;
  var canvas = document.getElementById( 'mycanvas' );
  if( canvas && canvas.getContext ){
    canvas.width = canvas_width = browserWidth * 0.8;
    canvas.height = canvas_height = browserHeight * 0.4;
  }
}

function touchStart( e ){
  e.preventDefault();
  //var obj = e.changedTouches[0];
  //var touchY = obj.pageY;
  isTouch = true;
  motionData = [];
  orientationData = [];
}

function touchEnd( e ){
  e.preventDefault();
  isTouch = false;

  if( motionData && motionData.length > 0 ){
    //. グラフ描画
    var labels = [];
    var x_data = [];
    var y_data = [];
    var z_data = [];
    for( var i = 0; i < motionData.length; i ++ ){
      var mot = motionData[i];
      labels.push( '' + i );
      x_data.push( mot['ac'].x );
      y_data.push( mot['ac'].y );
      z_data.push( mot['ac'].z );
    }

    var ctx1 = document.getElementById( 'mychart1' );
    var myChart1 = new Chart( ctx1, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'x',
          borderWidth: 1,
          backgroundColor: '#ffaaaa',
          borderColor: '#ff5555',
          fill: false,
          data: x_data
        },
        {
          label: 'y',
          borderWidth: 1,
          backgroundColor: '#aaffaa',
          borderColor: '#55ff55',
          fill: false,
          data: y_data
        },
        {
          label: 'z',
          borderWidth: 1,
          backgroundColor: '#aaaaff',
          borderColor: '#5555ff',
          fill: false,
          data: z_data
        }]
      },
      options: {
        title: {
          display: false,
          text: '三軸加速度',
          padding: 3
        },
        legend: {
          labels: {
            boxWidth: 30,
            padding: 20
          },
          display: true
        },
        tooltips: {
          mode: 'label'
        }
      }
    });

    motionData = [];
  }

  if( orientationData && orientationData.length > 0 ){
    //. グラフ描画
    var labels = [];
    var fb_data = [];
    var lr_data = [];
    var dir_data = [];
    for( var i = 0; i < orientationData.length; i ++ ){
      var ori = orientationData[i];
      labels.push( '' + i );
      fb_data.push( ori['fb'] );
      lr_data.push( ori['lr'] );
      dir_data.push( ori['dir'] );
    }

    var ctx2 = document.getElementById( 'mychart2' );
    var myChart2 = new Chart( ctx2, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '前後',
          borderWidth: 1,
          backgroundColor: '#ffaaff',
          borderColor: '#ff55ff',
          fill: false,
          data: fb_data
        },
        {
          label: '左右',
          borderWidth: 1,
          backgroundColor: '#aaffff',
          borderColor: '#55ffff',
          fill: false,
          data: lr_data
        }]
      },
      options: {
        title: {
          display: false,
          text: '前後左右角度',
          padding: 3
        },
        legend: {
          labels: {
            boxWidth: 30,
            padding: 20
          },
          display: true
        },
        tooltips: {
          mode: 'label'
        }
      }
    });

    orientationData = [];
  }
}

function deviceMotion( e ){
  e.preventDefault();
  if( isTouch ){
    var ac = e.acceleration;
    var acg = e.accelerationIncludingGravity;
    var rot = e.rotationRate;

    var motion = {};
    motion['ac'] = ac;
    motion['acg'] = acg;
    motion['rot'] = rot;

    motionData.push( motion );
  }
}
function deviceOrientation( e ){
  e.preventDefault();
  if( isTouch ){
    var gamma = e.gamma; //. Left/Right
    var beta = e.beta;   //. Front/Back
    var alpha = e.alpha; //. Direction

    var ori = {};
    ori['dir'] = alpha;
    ori['fb'] = beta;
    ori['lr'] = gamma;

    orientationData.push( ori );
  }
}