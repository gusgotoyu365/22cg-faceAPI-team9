let img, parts;
let options = {withLandmarks: true, withDescriptors: false};
let mouth = [], eyebrowL = [], eyebrowR = [];
function preload() {
  img = loadImage('face.png');
}

function setup() {
  for(let i=0; i<20; i++) {
    mouth[i] = [];
  }
  for(let i=0; i<6; i++) {
    eyebrowL[i] = [];
    eyebrowR[i] = [];
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
  //image(img, img.width, 0);    
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
  //translate(img.width,0);
  /**
    입술배열저장
  */
  for(let i=0; i<parts.mouth.length; i++) {
    mouth[i][0] = parts.mouth[i]._x;
    mouth[i][1] = parts.mouth[i]._y;
  }
  
  stroke(200);
  /*strokeWeight(1);
  textSize(10);
  for(let i=0; i<mleng; i++) {
    if (i==19) {
      push();
      fill(255);
      ellipse(10,10,100);
      pop();
    }
    text(i,parts.mouth[i]._x, parts.mouth[i]._y);
  }
  strokeWeight(3);*/
  /**
    코 그리기
  */
  //stroke(255, 0, 255);
  noFill();
  beginShape();
  for(let i=0; i<parts.nose.length; i++){
    vertex(parts.nose[i]._x, parts.nose[i]._y);
  }
  endShape();
  
  //눈 그리기
  fill(100);
  beginShape();
  for(let i=0; i<parts.leftEye.length; i++){
    vertex(parts.leftEye[i]._x, parts.leftEye[i]._y);
  }
  vertex(parts.leftEye[0]._x, parts.leftEye[0]._y);
  endShape();

  beginShape();
  for(let i=0; i<parts.rightEye.length; i++){
    vertex(parts.rightEye[i]._x, parts.rightEye[i]._y);
  }
  vertex(parts.rightEye[0]._x, parts.rightEye[0]._y);
  endShape();
 
  //눈썹배열저장
  for(let i=0; i<parts.leftEyeBrow.length; i++){
    eyebrowL[i][0] = parts.leftEyeBrow[i]._x;
    eyebrowL[i][1] = parts.leftEyeBrow[i]._y;
  }
  for(let i=0; i<parts.rightEyeBrow.length; i++){
    eyebrowR[i][0] = parts.rightEyeBrow[i]._x;
    eyebrowR[i][1] = parts.rightEyeBrow[i]._y;
  }
  
}

function draw() {
  console.log(mouth[0][0]);
  //blend(img,0,0,54,19,100,156,54,19,DARKEST);
  // 입술 위쪽
  push();
  noStroke();
  fill(picker1.color(),picker1.color(),picker1.color());
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
  fill(picker2.color(),picker2.color(),picker2.color());
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
  
  /**
    눈썹 그리기
  */
  noFill();
  stroke(200);
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
  
  //글자 만들기
  noStroke();
  fill(0);
  rect(0,img.height,img.width,img.height+55);
  fill(255);
  text('윗 입술',0,height-32);
  text('아래 입술',0,height-7);
}
