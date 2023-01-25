// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let compRaquete = 10;
let altRaquete = 90;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

// Variáveis do oponente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let velocidadeYOponente;

// Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;
let chanceErrar = 0;

function preload() {
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOp, yRaqueteOp)
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteOpon();
  incluirPlacar();
  marcarPontos();
  bolinhaNaoFicaPresa();
}

function mostraRaquete(x, y) {
  rect(x, y, compRaquete, altRaquete)
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOpon() {
  velocidadeYOponente = yBolinha - yRaqueteOp - compRaquete / 2 - 50;
  yRaqueteOp += velocidadeYOponente + chanceErrar;
  calculaChanceDeErrar();
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + compRaquete && 
      yBolinha - raio < yRaquete + altRaquete &&
     yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteOponenteBiblioteca() {
  colidiu = collideRectCircle(xRaqueteOp, yRaqueteOp, compRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(17);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26)
}

function marcarPontos() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceErrar += 1
    if (chanceErrar >= 39){
    chanceErrar = 40
    }
  } else {
    chanceErrar -= 1
    if (chanceErrar <= 35){
    chanceErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}