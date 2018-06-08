var game = new Phaser.Game(592, 288, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });



function preload() {

    function chargement_option(){
        game.load.image('choix1', 'image/selection1.png');
        game.load.image('choix2', 'image/selection2.png');
        game.load.image('cadena', 'image/cadena.png');
        game.load.image('TouchScreen_all', 'image/TouchScreen_all.png');

        game.load.image('Keyboard_all', 'image/Keyboard_all.png');

        game.load.image('Keyboard_all_vert', 'image/Keyboard_all_vert.png');
        game.load.image('TouchScreen_all_vert', 'image/TouchScreen_all_vert.png');

        game.load.image('option_background', 'image/option_background.png');


        game.load.image('sound_off', 'image/sound_off.png');
        game.load.image('sound_on', 'image/sound_on.png');

        game.load.image('fleche_gauche', 'image/fleche_gauche.png');
        game.load.image('fleche_droite', 'image/fleche_droite.png');

        game.load.image('fleche_gauche1', 'image/fleche_gauche1.png');
        game.load.image('fleche_droite1', 'image/fleche_droite1.png');


        game.load.image('restart', 'image/return.png');
        game.load.image('restart1', 'image/return1.png');


        game.load.image('scroll', 'image/scroll.png');
        game.load.image('scroll1', 'image/scroll1.png');
    }

    
    chargement_option();
    

}




function create() {
    
 game.stage.backgroundColor = '#AfAfAf';
    


    class Option{
        
        constructor(x,y,taille_descente,longueur,kb){
            this.x = x;
            this.y = y;
            this.taille_descente = taille_descente;
            this.longueur = longueur;
            this.kb = kb;
            
            this.sprites = [];   //tableau de tous les elements crees pour les options
            this.afficher = false;   //bool pour savoir si il faut afficher ou retirer les options
            
            
                this.scroll();
    this.afficher_niveau(1,34); 
    this.restart();
    this.creation_fleche(1,10,5,0);
    //background_option();
    this.creation_boutton_son(430,5);
    this.choix_key(98,10); //vrai si keyboard selectionne sinon faux
    this.creation_svg_y();
    console.log(this.sprites);
    //destroy();
        }
        creation_boutton_son(x,y){
        
            function sound_over(item) {
            if(item.son == "on"){
               item.loadTexture('sound_off');
            }else{
                item.loadTexture('sound_on');
            }
        }
            function sound_out(item) {
                    if(item.son == "on"){
                        item.loadTexture('sound_on');
                    }else{
                        item.loadTexture('sound_off');
                    }

}
            function sound_listener(item){

                    if(item.son == "on"){
                        item.loadTexture('sound_off');
                        item.son = "off";
                    }else{
                        item.loadTexture('sound_on');
                        item.son = "on";
                    }



}

            var sound = game.add.sprite(x,y,'sound_on');
            this.sprites.push(sound);
            sound.width = 50;
            sound.height = 50;

            sound.son = "on";

            sound.inputEnabled = true;
            sound.events.onInputOver.add(sound_over, this); 
            sound.events.onInputOut.add(sound_out, this);
            sound.events.onInputDown.add(sound_listener,this);
        
        
        
    }
        scroll(){
    
    
    function scroll_over(item) {
            item.loadTexture('scroll');
        }
    function scroll_out(item) {
            item.loadTexture('scroll1');
        }
    
    
    function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
    
    
    function scroll_listener(item) {
            this.afficher = !this.afficher;
        
            if(this.afficher){
                
                var i =0;

                console.log("A faire");
                
                while(i<200){                       //a faire dans le update
                        this.sprites.forEach(function(element) {
                        element.y = element.y_svg+i;
                        });
                }
            }else{
                
            }
        }
    
    
            scroll = game.add.sprite(296-20,60,'scroll1');
            this.sprites.push(scroll);
            scroll.width = 40;
            scroll.height = 30;


            scroll.inputEnabled = true;
            scroll.events.onInputOver.add(scroll_over, this); 
            scroll.events.onInputOut.add(scroll_out, this);
            scroll.events.onInputDown.add(scroll_listener,this);
    
}//creation du sprite pour le scroll
        background_option(){
        
        background = game.add.sprite(game.world.centerX,game.world.centerY, 'option_background');
        this.sprites.push(background);
        background.anchor.setTo(0.5, 0.5);
        background.width = game.width-10;
        background.height =  game.height-10;
} 
        choix_key(x,y){
    
        function touchScreen_over(item) {
            if(this.kb){
               item.loadTexture('TouchScreen_all_vert');
            }
        }
        function touchScreen_out(item) {
                    if(this.kb){
                        item.loadTexture('TouchScreen_all');
                    }

}
        function touchScreen_listener(item){

                    if(this.kb){
                       this.kb = false;
                        keyboard.loadTexture('Keyboard_all');
                    }



}
    
        function keyboard_over(item,item1) {
               item.loadTexture('Keyboard_all_vert');
        }
        function keyboard_out(item,item1) {
                    if(!this.kb){
                        item.loadTexture('Keyboard_all');
                    }

}
        function keyboard_listener(item,item1){

                    if(!this.kb){
                       this.kb = true;
                        touchScreen.loadTexture('TouchScreen_all');
                    }
            



}

        if(this.kb){
            var keyboard = game.add.sprite(x+70,y, 'Keyboard_all_vert');
            var touchScreen = game.add.sprite(x, y, 'TouchScreen_all');
        }else{
            var keyboard = game.add.sprite(x+70,y, 'Keyboard_all');
            var touchScreen = game.add.sprite(x, y, 'TouchScreen_all_vert');
        }
    
        this.sprites.push(keyboard);
        this.sprites.push(touchScreen);
    
        
        touchScreen.width = 60;
        touchScreen.height = 40;
    
        touchScreen.inputEnabled = true;
        touchScreen.events.onInputOver.add(touchScreen_over, this); 
        touchScreen.events.onInputOut.add(touchScreen_out, this);
        touchScreen.events.onInputDown.add(touchScreen_listener,this);


        
        keyboard.width = 40;
        keyboard.height = 40;
        keyboard.inputEnabled = true;
    
        keyboard.events.onInputOver.add(keyboard_over, this,touchScreen); 
        keyboard.events.onInputOut.add(keyboard_out, this,touchScreen);
        keyboard.events.onInputDown.add(keyboard_listener,this,touchScreen);
    
}//
        creation_fleche(level_min,level_max,level_max_atteind,level_actuel){
    
    function fleche_over(item) {
            if(item.direction == "gauche" && level_actuel != 0){
               item.loadTexture('fleche_gauche');
            }else if(item.direction == "droite" && level_actuel != level_max && level_actuel != level_max_atteind){
                item.loadTexture('fleche_droite');
            }
        }
    function fleche_out(item) {
            if(item.direction == "gauche"){
               item.loadTexture('fleche_gauche1');
            }else if(item.direction == "droite"){
                item.loadTexture('fleche_droite1');
            }
        }
    function fleche_listener(item) {
            if(item.direction == "gauche" && level_actuel != 0){
               console.log("A faire");
            }else if(item.direction == "droite" && level_actuel != level_max && level_actuel != level_max_atteind){
                console.log("A faire");
            }
        }
    
        var fleche_gauche = game.add.sprite(30,30, 'fleche_gauche1');
        this.sprites.push(fleche_gauche);
        fleche_gauche.direction = "gauche"
        fleche_gauche.anchor.setTo(0.5, 0.5);
    
        fleche_gauche.width = 40;
        fleche_gauche.height = 40;
    
        fleche_gauche.inputEnabled = true;
        fleche_gauche.events.onInputOver.add(fleche_over,this); 
        fleche_gauche.events.onInputOut.add(fleche_out, this);
        fleche_gauche.events.onInputDown.add(fleche_listener,this);
    
    
    
        var fleche_droite = game.add.sprite(592-30,30, 'fleche_droite1');
        this.sprites.push(fleche_droite);
        fleche_droite.direction = "droite";
        fleche_droite.anchor.setTo(0.5, 0.5);
    
        fleche_droite.width = 40;
        fleche_droite.height = 40;
    
        fleche_droite.inputEnabled = true;
        fleche_droite.events.onInputOver.add(fleche_over,this); 
        fleche_droite.events.onInputOut.add(fleche_out, this);
        fleche_droite.events.onInputDown.add(fleche_listener,this);
    
        
    
    
}
        restart(level_actuel){
    
    
    
    
    function restart_over(item) {
            item.loadTexture('restart');
        }
    function restart_out(item) {
            item.loadTexture('restart1');
        }
    function restart_listener(item) {
            console.log("A faire");
        }
    
        var restart = game.add.sprite(400,30, 'restart1');
        this.sprites.push(restart);
        restart.anchor.setTo(0.5, 0.5);
    
        restart.width = 40;
        restart.height = 30;
    
        restart.inputEnabled = true;
        restart.events.onInputOver.add(restart_over,this); 
        restart.events.onInputOut.add(restart_out, this);
        restart.events.onInputDown.add(restart_listener,this);
    
    
}
        afficher_niveau(level_actuel,level_max){
    
    	var style = { font: "40px Arial", fill: "#ffffff", align: "center" };
        var texte = game.add.text(296-40,10, level_actuel+"/"+level_max, style);
        this.sprites.push(texte);
    
}
        destroy(){
    
    this.sprites.forEach(function(element) {
        element.destroy();
    });
    
}
        creation_svg_y(){
    
    this.sprites.forEach(function(element) {
        element.y_svg = element.y;
    });
    
}
        
    }; 
    
    
    option = new Option(0,0,30,592,false); // ReferenceError
    
}

function update(){}
            
            
            
            
            
            
            
            
            

            
            
            
  














