
// ISSUES
// 1. Le texte "g C02" à la droite des barres bougent toujours !! 
// 2. Pas réussi à faire tourner le sunshine :'(
// 3. Comment faire en sorte que les variables dans drawTee() ne continuent pas à évoluer?

// 4. On fait quoi qd la barre de l'avion dépasse? d'ailleurs elle dépasse trop rapidement, on voit à peine les autres évoluer... (voir ligne 159, c'est bof)
// 5. Pas trop compris quand est-ce qu'on affiche la page d'accueil

let fontsize = 20;
let angle;

function setup() {
  createCanvas(1920, 1080);
  
  fontHoops = loadFont("Hoops!.ttf");
  fontArial = loadFont("Arial.ttf");
  textFont(fontArial);
  textAlign(CENTER, CENTER);
  
  background_img = loadImage('assets/background+board.png');
  blue_img = loadImage('assets/page1_background.png');
  sunshine_img = loadImage('assets/sunshine.png');
  green_img = loadImage('assets/page2_background.png');
  yourRide_img = loadImage('assets/page2_your_ride.png');
  logo_img = loadImage('assets/logo.png');
  woodBoard_img = loadImage('assets/wood_board.png');
  kmBoard_img = loadImage('assets/km_board.png');
  bus_img = loadImage('assets/bus.png');
  plane_img = loadImage('assets/plane.png');
  car_img = loadImage('assets/car.png');
  human_img = loadImage('assets/human.png');
  train_img = loadImage('assets/train.png');
  zone_img = loadImage('assets/zone.png');
  treeCounter_img = loadImage('assets/tree_counter.png');
  seat_img = loadImage('assets/seat.png');
  restart_img = loadImage('assets/restart.png');
  donate_img = loadImage('assets/donate_panel.png');


  angle = 0;
  sitting_down = true;
  nb_trees = 0;
  increment_trees = 1;
  nb_trees_plane = 0;
  increment_trees_plane = 1;
}


function draw() {
  
  // if we consider the bus is going 60km/h
  speed = 60;
  // nf is used to truncate the number
  time = nf( (millis()/(1000*3600)), 0, 4 );
  distance = speed*time;

  //C02 stats
  byBus = nf( 69*distance, 0, 2 );
  byTrain = nf( 75*distance, 0, 2 );
  byMotorcycle = nf( 94*distance, 0, 2 );
  byCar = nf( 133*distance, 0, 2 );
  byPlane = nf( 170*distance, 0, 2 );

  //load assets
  image(background_img, 0, 0);
  image(blue_img, 621, 153);
  sunshine_img.resize(670,670);
  image(sunshine_img, 623, 153); 
  image(green_img, 567, 155);
  image(yourRide_img, 1025, 200);
  logo_img.resize(200,130);
  image(logo_img, 635, 180);
  image(woodBoard_img, 655, 310);
  image(kmBoard_img, 890, 310);

  //text
  textSize(fontsize);
  fill(255);
  textAlign(CENTER);


  //if someone is sitting down on the chair
  if(sitting_down)
  {
    text( nf(distance, 0, 2 ) + ' km', 958, 339);

    //zones
    image(zone_img, 760, 386);
    image(zone_img, 760, 471);
    image(zone_img, 760, 556);
    image(zone_img, 760, 641);
    image(zone_img, 760, 726);
  	  triangle(720, 485, 730, 495, 720, 505)
    //logos transports
    plane_img.resize(62,62);
    image(plane_img, 740, 380);
    bus_img.resize(62,62);
    image(bus_img, 740, 465);
    car_img.resize(62,62);
    image(car_img, 740, 550);
    train_img.resize(62,62);
    image(train_img, 740, 635);
    human_img.resize(62,62);
    image(human_img, 740, 720);
    //tree counter
    image(treeCounter_img, 885, 770);
    treeCounter_img.resize(160,139);

    textAlign(CENTER);
    drawLines();

    //write nb of trees
    set_nb_trees();
    text( nf(nb_trees, 0, 2 ), 938, 846);

  }
  //when the person gets up, tree stats show up
  else showTree();

}

function set_nb_trees()
{
  //takes 1h for an old Acacia tree to absorb 500g of CO2
  //0.5 tree for 250g
  //0.05 tree for 25g

  //BUS
  value_bus = byBus - increment_trees * 25;
  if (value_bus < 0.7 && value_bus >= 0)
  {
    nb_trees += 0.05;
    increment_trees++;
  } 

  //PLANE
  value_plane = byPlane - increment_trees_plane * 25;
  if (value_plane < 1.2 && value_plane >= 0) //large interval because it goes to quickly, we need to be approimative...
  {
    nb_trees_plane += 0.05;
    increment_trees_plane++;
  } 

}

function drawLines() {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position
  
  strokeWeight(30); 
  blue1 = color(0,0,255);
  green1 = color(0,240,100);
  yellow1 = color(255,255,0);
  red1 = color(240,0,0);
  purple1 = color(240,0,240);
  textAlign(LEFT);

  //max length is 830gC02, first reached by the plane
  A = 1;
  ratio = A/2;

	plane =  1 / byPlane;
  //plane
  stroke(green1);
  line(823, 410, 823+ plane * byPlane * 230, 410);
  //line(823, 410, 823+ ratio*byPlane +5, 410);
  //bus
  stroke(yellow1);
  line(823, 495, 823+ plane * byBus * 230, 495);
  //car
  stroke(red1);
  line(823, 580, 823+ plane * byCar * 230, 580);
  //train
  stroke(purple1);
  line(823, 665, 823+ plane*byTrain *230, 665);
  //human
  stroke(blue1);
  line(823, 750, 823, 750);

  //"g CO2" text
  noStroke();
  text(byBus + 'g CO2', 1074, 495+3);
  text(byPlane + 'g CO2', 1074, 410+3); //text is 3px lower than line
  text(byCar + 'g CO2', 1074, 580+3);
  text(byTrain + ' g CO2', 1074, 665+3);
  text('0g CO2', 1074, 750+3);
}

function keyPressed() 
{
  clear(); 
  if(key == 't') sitting_down = !sitting_down;
}
  
function showTree() 
{
  image(seat_img, 665, 632);

  captured_distance = distance; //doesn't work :(
  text( '20' + ' km', 958, 339); //20 is random, just to test

  textFont(fontHoops);
  fill(255);

  textSize(30);
  text('Approximate cost of your', 950, 420);
  text('travel by plane', 950, 460);

  textSize(28);
  text('Trees working for', 950, 565);
  text('hour', 959, 600);

  textSize(24);
  text('Want to keep going?', 950, 675);
  text('Just sit back!', 950, 710);

  textFont(fontArial);
  textSize(35);
  text( nf(nb_trees_plane,0,2), 950, 510);
  textSize(30);
  text(' :', 1052, 462);
  textSize(28);
  text('1', 915, 602);

  image(restart_img, 895, 760);
  image(donate_img, 1070, 480);


  //(trees always working for 1h, else calculations are way too complicated)

}
  
