
import {CindyToolkit} from './CindyToolkit.js';
import {SVG} from './svg.min.js'

var window = SVG().addTo('body').size('1000','1000');

// a  Button
var btn = new CindyToolkit.Button(window, "A Button");
btn.move(25,25);

btn.onClick(function(e){
	console.log(e);
});
btn.stateChanged(function(e) {
	console.log(e);
});

// a Check Box
var chkbox = new CindyToolkit.CheckBox(window, "A Check Box with \"some\" condition");
chkbox.move(25, 100);
chkbox.onCheck(function(e){
	console.log(e);
});
chkbox.stateChanged(function(e) {
	console.log(e);
});

// Radio Buttons * 4
var radioBs = new CindyToolkit.RadioButton(window,4);
radioBs.move(25, 200);
radioBs.setLabel(2, "customized label for #2");
radioBs.onCheck(function(e){
	console.log(e);
});
radioBs.stateChanged(function(e) {
	console.log(e);
});



// a Text Box
var textbox = new CindyToolkit.TextBox(window);
textbox.move(25, 400);
textbox.onChange(function(e){
	console.log(e);
  console.log(textbox.text);
});
textbox.stateChanged(function(e) {
	console.log(e);
});

// Scroll Bar A with height of 400
var scrollbarA = new CindyToolkit.Scrollbar(window);
scrollbarA.move(500,25);
scrollbarA.setBarHeight(400);
var pos = scrollbarA.getThumbPos();
console.log("ScrollbarA Thumb Position: " + pos);

scrollbarA.onScroll(function(e){
	console.log(e);
  console.log(scrollbarA.getThumbPos());
});
scrollbarA.stateChanged(function(e) {
	console.log(e);
});

// Scroll Bar with height of 100
var scrollbarB = new CindyToolkit.Scrollbar(window);
scrollbarB.move(550,25);
scrollbarB.setBarHeight(100);
var pos = scrollbarB.getThumbPos();
console.log("ScrollbarB Thumb Position: " + pos);

scrollbarB.onScroll(function(e){
	console.log(e);
  console.log(scrollbarB.getThumbPos());
});
scrollbarB.stateChanged(function(e) {
	console.log(e);
});



// Progress Bar
var progressBar = new CindyToolkit.ProgressBar(window);
progressBar.move(25,500);
progressBar.setBarWidth(400);
progressBar.setIncrementValue(30);
var incrementValue = progressBar.getIncrementValue();
console.log("Progress bar's initial increment value: " + incrementValue);

progressBar.onIncrement(function(e){
	console.log(e);
});
progressBar.stateChanged(function(e) {
	console.log(e);
});

// Custom widget: thumb up Button
var thumbUpBtn = new CindyToolkit.ThumbUp(window, 821);
thumbUpBtn.move(350, 200);
thumbUpBtn.onUp(function(e){
	console.log(e);
});
thumbUpBtn.stateChanged(function(e) {
	console.log(e);
});
let num = thumbUpBtn.getThumbNumber()
console.log("Thumb Up number is currently "+ num);