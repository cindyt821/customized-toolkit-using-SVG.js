import {SVG} from './svg.min.js';

/**
 * 
 * @param {*} window - the window to display the button
 * @param {String} t - text shown on the button
 * @returns {Function} move
 */
var Button = function(window, t){
  var rect = window.rect(80,40).fill('pink');
  var state = "";
  var clickEvent = null;
  var stateEvent = null;
  var text = t;
  var label = window.text(text).fill('#cc3399').font('family', 'cantal');

  rect.mouseover(function(){
      this.fill({color: 'pink', opacity: 0.8}).stroke({color: '#cc3399', width: 2.0});
      state = "hover";
      stateTransit();
  })
  rect.mouseout(function(){
      this.fill({color: 'pink', opacity: 1}).stroke({color: 'pink', width: 2.0});
      state = "idle";
      stateTransit();
  })
  rect.mouseup(function(){
      this.fill({color: 'pink'});
      state = "idle";
      stateTransit();
  })
  rect.click(function(event){
      this.fill({color: "purple", opacity: 0.8});
      state = "clicked";
      stateTransit();
      if(clickEvent != null)
          clickEvent(event);
  })

  function stateTransit(){
    if (state !== ""){
      stateEvent("Button state: "+state);
    }
  }

  return {
      /**
       * 
       * @param {Integer} x - move to location on x-axis
       * @param {Integer} y - move to location on y-axis
       */
      move: function(x, y) {
          rect.move(x, y);
          label.move(x+10, y+9);
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      onClick: function(eventHandler){
          clickEvent = eventHandler;
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      stateChanged: function(eventHandler) {
          stateEvent = eventHandler;
      },
  }
};

/**
 * 
 * @param {*} window - canvas to display
 * @param {String} t - text shown on the right side of the checkbox 
 * @returns {Function} move
 */
var CheckBox = function(window, t){
  var circle = window.circle(30).fill({color:'pink', opacity: 0.2}).stroke({color: '#cc3399', width: 2.0});
  var mydrawing = SVG('<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><line style="paint-order: fill; stroke: rgb(204, 51, 153); stroke-opacity: 0.73; stroke-width: 50px;" x1="116.785" y1="169.005" x2="229.246" y2="328.694"/><line style="paint-order: fill; stroke: rgb(204, 51, 153); stroke-opacity: 0.73; stroke-width: 50px;" x1="221.953" y1="328.379" x2="427.846" y2="110.992"/></svg>');
  var checkMark = window.foreignObject(35, 35);
  checkMark.add(mydrawing);
  checkMark.hide();
  var state = "";
  var checked = "false";
  var checkEvent = null;
  var stateEvent = null;
  var text = t;
  var label = window.text(text).fill('#cc3399').font('family','cantal');

  circle.mouseover(function(){
      this.fill({color: "purple", opacity: 0.5});
      state = "hover";
      stateTransit();
  })
  circle.mouseout(function(){
      this.fill({color: 'pink', opacity: 0.2});
      state = "idle";
      stateTransit();
  })

  circle.click(function(event){
      checked = "true";
      state = "clicked";
      stateTransit();
      checkEvent(event);
      checkMark.show();
      let x = circle.x();
      let y = cicle.y();
      checkMark.move(x-4, y);
  })
  
  checkMark.click(function(event){
      checked = "false";
      state = "clicked";
      stateTransit();
      checkMark.hide();
      checkEvent(event);
  })
  

  function stateTransit(){
    if (state != ""){
      stateEvent("Check Box state: "+state);
    }
  }

  return {
      /**
       * 
       * @param {Integer} x - move to location on x-axis
       * @param {Integer} y - move to location on y-axis
       */
      move: function(x, y) {
          circle.move(x, y);
          label.move(x+40, y+5);
          checkMark.move(x-4, y);
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      onCheck: function(eventHandler){
          checkEvent = eventHandler;
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      stateChanged: function(eventHandler) {
          stateEvent = eventHandler;
      },
  }

}

/**
 * 
 * @param {*} window - canvas to display 
 * @param {Integer} n - n>=2 number of radio buttons
 * @returns {Function} move
 */
var RadioButton = function(window, n){
  var radios = window.group();
  var radioArray = [];
  var checked = -1;
  var state = "";
  var checkedEvent = null;
  var stateEvent = null;
  var labelArray = []

  // construct all radio buttons in array
  for (let i=0; i<n; i++) {
    var newrb =  radios.circle(15).fill({color:'pink', opacity: 0.2}).stroke({color: '#cc3399', width: 1.0});
    radioArray.push(newrb);
    var label = radios.text("default label " + i).fill('#cc3399').font('family', 'cantal');
    labelArray.push(label);
  }
  
  // check changes
  for(let i = 0; i<n; i++){
    radioArray[i].mouseover(function(){
      this.fill({color: 'pink', opacity: 0.8}).stroke({color: '#cc3399', width: 1.0});
      state = "hover";
      stateTransit();
    })
    radioArray[i].mouseout(function(){
      this.fill({color: 'pink', opacity: 0.2}).stroke({color: '#cc3399', width: 1.0});
      state = "idle";
      stateTransit();
      if (checked == i) {
        this.fill({color: '#cc3399', opacity: 1});
      }
    })
    radioArray[i].click(function(){
      this.fill({color: '#cc3399', opacity: 1});
      state = "checked " + i ;
      if (checked != -1) {
        radioArray[checked].fill({color: 'pink', opacity: 0.2}).stroke({color: '#cc3399', width: 1.0});
      }
      checked = i;
      stateTransit();
      if(checkedEvent != null)
          checkedEvent("Radio Buttons checked is: "+"#"+checked);
    })

  }


  function stateTransit(){
    if (state !== ""){
      stateEvent("Radio Buttons state: "+state);
    }
  }
  return {
      /**
       * 
       * @param {Integer} x - move to location on x-axis
       * @param {Integer} y - move to location on y-axis
       */
      move: function(x, y) {
          let newx = x;
          let newy = y;
          for (let i =0; i<n; i++) {
            radioArray[i].move(newx, newy);
            labelArray[i].move(newx + 25, newy-3);
            newy += 35;
          }
      },
      /**
       * 
       * @param {Integer} i - the desired index of radio button to be changed
       * @param {String} newlabel - the new label text to change to
       */
      setLabel: function(i, newlabel) {
          labelArray[i].text(newlabel);
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      onCheck: function(eventHandler){
          checkedEvent = eventHandler;
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      stateChanged: function(eventHandler) {
          stateEvent = eventHandler;
      }
      }
};

/**
 * 
 * @param {*} window - place to display textBox
 * @returns {Function} move
 */
var TextBox = function(window){
  var textbox = window.group();
  var rect = textbox.rect(200,30).fill({color: 'pink', opacity: 0.3}).stroke({color: '#cc3399', width: 2.0});
  var text = textbox.text("type here").move(8,4);
  var state = "";
  var changeEvent = null;
  var stateEvent = null;
  var caret = textbox.rect(1, 20).stroke({color: '#cc3399', width: 1.0}).move(5, 5).opacity(0);
  var runner = caret.animate().width(0);
  runner.loop(1000,10,10);


  textbox.mouseover(function(){
      state = "hover";
      caret.opacity(1);
      stateTransit();
  })

  textbox.mouseout(function(){
      state = "idle";
      caret.opacity(0);
      stateTransit();
  })

  textbox.mouseup(function(){
      state = "clicked";
      caret.opacity(1);
      stateTransit();
  })

  textbox.click(function(event){
      caret.opacity(1);
      state = "clicked";
      text.text("");
      stateTransit();
  })

  function stateTransit(){
    if (state !== ""){
      stateEvent("Text Box state: "+state);
    }
  }

  return {
      /**
       * 
       * @param {Integer} x - move to location on x-axis
       * @param {Integer} y - move to location on y-axis
       */
      move: function(x, y) {
          textbox.move(x, y);
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      onChange: function(eventHandler){
          changeEvent = eventHandler;
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      stateChanged: function(eventHandler) {
          stateEvent = eventHandler;
      },
      /**
       * 
       * @returns the textbox item itself
       */
      src: function() {
        return textbox;
      },
      /**
       * 
       * @returns user input textbox text
       */
      text: function() {
        return text;
      },
  }
    
}

/**
 * 
 * @param {*} window - canvas to display scrollbar on
 * @returns {Function} move
 */
var Scrollbar = function(window) {
    var scrollbar = window.group();
    var iniX = 100;
    var iniY = 700;
    var defaultHeight = 300;
    var bar = scrollbar.rect(19, defaultHeight).stroke({color: '#cc3399', width: 1.5}).fill('none').move(5,5);
    bar.radius(8);
    var thumb = scrollbar.rect(15,100).stroke('none').fill('pink');
    thumb.move(bar.x()+2, bar.y()+2);
    thumb.radius(10);

    var scrollEvent = null;
    var stateEvent = null;
    var direction = "";
    var state = "";
    var enableMove = false;


    thumb.mouseup(function(event){
        enableMove = false;
        this.fill({color:'pink', opacity:1});
        state = "idle";
        stateTransit();
    });

    thumb.mouseover(function(event){
        enableMove = true;
        this.fill({color:'pink', opacity:0.5});
        state = "hover";
        stateTransit();
    });

    thumb.mouseout(function(event) {
        this.fill({color:'pink', opacity:1});
        state = "idle";
        stateTransit();
    });
    
    thumb.mousedown(function(event) {
        enableMove = true;
        this.fill({color:'#cc3399', opacity:1});
        state = "selected";
        stateTransit();
    });

    var oldY = 0;
    thumb.mousemove(function(event) {
        let newY;
        if (enableMove == true) {
            if (event.clientY > oldY) {
                direction = "downwards";
                if (scrollEvent != null) {
                    scrollEvent("thumb is moved "+ direction);
                  }
                oldY = event.clientY;
                newY = thumb.y() + 2;
                if (newY + thumb.height() <= ((bar.y() + bar.height()) - 2)) {
                        thumb.dy(2);
                }
            }
            else if (event.clientY < oldY) {
                direction = "upwards"
                if (scrollEvent != null) {
                    scrollEvent("thumb is moved "+ direction);
                }
                oldY = event.clientY;
                let newY = thumb.y() - 2;
                if (newY >= (bar.y() + 5)) {
                    thumb.dy(-2);
                }
            }
            thumb.fill('#cc3399');
        }
    });

    function stateTransit(){
    if (state !== ""){
      stateEvent("Scrollbar state: "+state);
    }
    };

    return {
        /**
        * 
        * @param {Integer} x - move to location on x-axis
        * @param {Integer} y - move to location on y-axis
        */
        move: function(x,y) {
            scrollbar.move(x,y);
            iniX = x;
            iniY = y;
        },
        
        /**
         * 
         * @param {Integer} n - the new height desired to set bar to
         */
        setBarHeight: function(n) {
            bar.height(n);
            thumb.height(n/3);
        },
        
        /**
         * 
         * @returns current thumb position on the bar
         */
        getThumbPos() {
            return [thumb.x(), thumb.y()]
        },
        
        /**
         * 
         * @param {*} eventHandler 
         */
        onScroll(eventHandler) {
            scrollEvent = eventHandler;
        },
          
        /**
         * 
         * @param {*} eventHandler 
         */
        stateChanged: function(eventHandler) {
            stateEvent = eventHandler
        }
        
    }
}

/**
 * 
 * @param {*} window - place to display progress bar
 * @returns {Function} move
 */
var ProgressBar = function(window) {
    var progressBar = window.group()
    var barW = 300;
    var progressW = 0;
    var bar = progressBar.rect(barW,16).stroke({color: '#cc3399', width: 1.5}).fill('none').move(5, 5).front();
        bar.radius(8);
    var progress = progressBar.rect(130, 14).fill({color: '#cc3399', opacity:0.5}).move(5, 6);
    progress.radius(8);

    var inc = progressBar.text("+").font({'family': 'cantal', 'size': 30}).fill("#cc3399");
    var dec = progressBar.text("-").font({'family': 'cantal', 'size': 40}).fill("#cc3399");


    var progressEvent = null;
    var stateEvent = null;
    var state = "";
    var increment = 10;

    inc.click(function(event){
        let newW = progress.width() + increment
        if (barW - newW <= 1) {
            progress.width(outlineWidth);
        }
        else {
            progress.width(newW);
        }
        if (progressEvent != null) {
            progressEvent("Progress bar is incremented by " + increment);
        }
        state = "clicked increment btn";
        stateTransit();
    });

    dec.click(function(event) {
        state = "clicked decrement btn";
        stateTransit();
        let newW = progress.width() - increment
        if (newW<= 0) {
            progress.width(0);
        }
        else {
            progress.width(newW);
        }
        if (decrementEventHandler != null) {
            decrementEventHandler(event);
        }
    });

    
    function stateTransit(){
      if (state !== ""){
        stateEvent("Progressbar state: "+state);
      }
    };
        
    return {
        /**
        * 
        * @param {Integer} x - move to location on x-axis
        * @param {Integer} y - move to location on y-axis
        */
        move: function(x,y) {
          progressBar.move(x, y);
          let mid = (x + barW )/2 + x
          dec.move(mid+25, y+2);
          inc.move(mid+50, y+8);
        },
        
        /**
         * 
         * @param {Integer} val - desired bar width to set the progress outer box to
         */
        setBarWidth: function(val) {
            bar.width(val);
            barW = val;
        },
        
        /**
         * 
         * @param {Interger} val - increment value setter
         */
        setIncrementValue: function(val) {
            increment = val;
            let currW = bar.width() - 2;
            progress.width(currW * (val/100));
        },
        
        /**
         * 
         * @returns {Interger} increment value getter
         */
        getIncrementValue: function() {
            return increment;
        },
        
        /**
         * 
         * @param {*} event 
         */
        stateChanged: function(event) {
            stateEvent = event;
        },
          
        /**
         * 
         * @param {*} event 
         */
        onIncrement: function(event) {
            progressEvent = event;
        }
    }

}

/**
 * 
 * @param {*} window - place to display thumb up button
 * @param {Integer} initN - initial thumb up value stored
 * @returns {Function} move
 */
var ThumbUp = function(window, initN) {
  var thumbgroup = window.group();
  var source = SVG('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 29.046 29.046" style="enable-background:new 0 0 29.046 29.046;" xml:space="preserve"><g><path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"/></svg>');
  var thumb = thumbgroup.foreignObject(35, 35);
  thumb.add(source);
  thumb.fill("pink");
  var num = initN;
  var label = thumbgroup.text(num+"").fill('#cc3399').font('family','cantal').move(200, 300);
  var state = "";
  var upEvent = null;
  var stateEvent = null;

  thumb.mouseover(function(){
      this.fill({color: "#cc3399", opacity: 0.5});
      state = "hover";
      stateTransit();
  })
  thumb.mouseout(function(){
      this.fill({color: 'pink', opacity: 1});
      state = "idle";
      stateTransit();
  })

  thumb.click(function(event){
      this.fill({color: "#cc3399", opacity: 1})
      state = "thumbUped";
      stateTransit();
      this.animate().attr({fill: "#cc3399"});
      upEvent("Thumbed Up Event");
      num += 1;
      label.text(num+"");
  })
  
  function stateTransit(){
    if (state != ""){
      stateEvent("ThumbUp Button state: "+state);
    }
  }

  return {
      /**
       * 
       * @param {Integer} x - move to location on x-axis
       * @param {Integer} y - move to location on y-axis
       */
      move: function(x, y) {
          thumbgroup.move(x, y);
          label.move(x+40, y+5);
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      onUp: function(eventHandler){
           upEvent = eventHandler;
      },
      /**
       * 
       * @param {*} eventHandler 
       */
      stateChanged: function(eventHandler) {
          stateEvent = eventHandler;
      },
      /**
       * 
       * @returns current thumbed up number getter
       */
      getThumbNumber: function(){
        return num;
      }
  }

}




var CindyToolkit = (function() {
    return {Button, CheckBox, RadioButton, TextBox, Scrollbar, ProgressBar, ThumbUp};
}());

export{CindyToolkit};

