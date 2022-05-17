let img, parts, button, alphaG = 0;
let options = {withLandmarks: true, withDescriptors: false};
let mouth = [], eyebrowL = [], eyebrowR = [], eyeL = [], eyeR = [], nose = [];
let slider;

function preload() {
  img = loadImage('face.png');
  imgG = loadImage('Gface.png');
}

function setup() {
  for(let i=0; i<20; i++) {
    mouth[i] = [];
  }
  for(let i=0; i<5; i++) {
    eyebrowL[i] = [];
    eyebrowR[i] = [];
  }
  for(let i=0; i<6; i++) {
    eyeL[i] = [];
    eyeR[i] = [];
  }
  for(let i=0; i<10; i++) {
    nose[i] = [];
  }
  
  createCanvas(img.width*2, img.height+55);
  faceapi = ml5.faceApi(options, modelReady);
  background(255);
  image(img, 0, 0);
  picker1 = createColorPicker('#FF6464');
  picker2 = createColorPicker('#FFC8C8');
  picker1.position(90,height-55);
  picker2.position(90,height-27);
  textSize(18); 
  button = createButton('황금비율 확인하기');
  button.position(img.width*2-130, img.height+5);
  button.mousePressed(goldgo);
  img.mask(imgG);
  slider = createSlider(0,255,127);
  slider.position(img.width*2-133,height-25);
}

function modelReady() {
  faceapi.detectSingle(img, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
  parts = results.parts;
  noFill();
  stroke(200);
  strokeWeight(3);
  drawFace();
}

function drawFace() {
  //눈썹배열저장
  for(let i=0; i<parts.leftEyeBrow.length; i++){
    eyebrowL[i][0] = parts.leftEyeBrow[i]._x;
    eyebrowL[i][1] = parts.leftEyeBrow[i]._y;
  }
  for(let i=0; i<parts.rightEyeBrow.length; i++){
    eyebrowR[i][0] = parts.rightEyeBrow[i]._x;
    eyebrowR[i][1] = parts.rightEyeBrow[i]._y;
  }
  
   //눈배열저장
  for(let i=0; i<parts.leftEye.length; i++){
    eyeL[i][0] = parts.leftEye[i]._x;
    eyeL[i][1] = parts.leftEye[i]._y;
  }
  for(let i=0; i<parts.rightEye.length; i++){
    eyeR[i][0] = parts.rightEye[i]._x;
    eyeR[i][1] = parts.rightEye[i]._y;
  }
  
  //코배열저장
  for(let i=0; i<parts.nose.length; i++){
    nose[i][0] = parts.nose[i]._x;
    nose[i][1] = parts.nose[i]._y;
  }
  
  //입술배열저장
  for(let i=0; i<parts.mouth.length; i++) {
    mouth[i][0] = parts.mouth[i]._x;
    mouth[i][1] = parts.mouth[i]._y;
  }
}

function draw() { 
  drawFaceinScreen(0);
  //글자 만들기
  noStroke();
  fill(0);
  rect(0,img.height,img.width*2,img.height+55);
  fill(255);
  text('윗 입술',0,height-32);
  text('아래 입술',0,height-7);
  text('투명도',img.width*2-200,height-7);
  translate(img.width,0);
  fill(255);
  rect(0, 0, img.width, img.height);
  drawFaceinScreen(1);
  tint(230, alphaG);
  image(imgG, 42,0,img.width-80, img.height-59);
}

// 황금비율 추가
function goldgo() {
  if (alphaG == 0) {
    alphaG = 80;
  } else if (alphaG == 80) {
    alphaG = 0;
  }
  //image(imgG, 42,0,img.width-80, img.height-59);
}

function drawFaceinScreen(s) {
  //눈썹 그리기
  if (s==1) {
    stroke(0,0,0,slider.value());
  } else {
    stroke('rgb(74,255,154)');
  }
  noFill();
  beginShape();
  
  for(let i=0; i<5; i++){
    vertex(eyebrowL[i][0], eyebrowL[i][1]);
  }
  endShape();
  
  beginShape();
  for(let i=0; i<5; i++){
    vertex(eyebrowR[i][0], eyebrowR[i][1]);
  }
  endShape();

  //눈 그리기
  push();
  if (s==0) {
    fill(255);
    stroke('rgb(74,255,154)');
  }
  beginShape();
  for(let i=0; i<5; i++){
    vertex(eyeL[i][0], eyeL[i][1]);
  }
  vertex(eyeL[0][0], eyeL[0][1]);
  endShape();

  beginShape();
  for(let i=0; i<5; i++){
    vertex(eyeR[i][0], eyeR[i][1]);
  }
  vertex(eyeR[0][0], eyeR[0][1]);
  endShape();
  pop();
  
  //코 그리기
  noFill();
  beginShape();
  for(let i=0; i<10; i++){
    vertex(nose[i][0], nose[i][1]);
  }
  endShape();
  
  // 입술 위쪽
  push();
  noStroke();
  if (s==0) {
    fill(picker1.color(),picker1.color(),picker1.color());
  } else {
    stroke(0,slider.value());
  }
  beginShape();
  for(let i=0; i<7; i++){
    vertex(mouth[i][0], mouth[i][1]);
  }
  for(let i=16; i>11; i--) {
    vertex(mouth[i][0], mouth[i][1]);
  }
  vertex(mouth[0][0], mouth[0][1]);
  endShape();
  pop();
  
  //입술 아래쪽
  push();
  beginShape();
  noStroke();
  if (s==0) {
    fill(picker2.color(),picker2.color(),picker2.color());
  } else {
    stroke(0,slider.value());
  }
  for(let i=6; i<12; i++){
    vertex(mouth[i][0], mouth[i][1]);
  }
  vertex(mouth[0][0], mouth[0][1]);
  for(let i=19; i>16; i--){
    vertex(mouth[i][0], mouth[i][1]);
  }
  vertex(mouth[6][0], mouth[6][1]);
  endShape();
  pop();
}