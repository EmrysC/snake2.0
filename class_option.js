  ///////////////////////
 /////option////////////
///////////////////////
class Option{
        
        constructor(x,y,taille_descente,longueur,kb,vitesse_descente,niveau_max_attend,niveau_actuel,niveau_max,menu_const){
            this.x = x;
            this.x_actuel = x;
            this.y = y;
            this.taille_descente = taille_descente;
            this.longueur = longueur;
            this.kb = kb;
            this.vistesse_descente = vitesse_descente;
            this.niveau_max_attend = niveau_max_attend;
            this.niveau_actuel = niveau_actuel;
            this.niveau_max = niveau_max;
            this.menu_const = menu_const;
            
            this.sprites = [];   //tableau de tous les elements crees pour les options
            this.afficher = false;   //bool pour savoir si il faut afficher ou retirer les options
               
            this.background_option();
            this.menu();
            this.scroll();
            this.afficher_niveau(this.niveau_actuel,this.niveau_max); 
            this.restart();
            this.creation_fleche(1,this.niveau_max,this.niveau_max_attend,this.niveau_actuel); //creation_fleche(level_min,level_max,level_max_atteind,level_actuel){
            this.creation_boutton_son(430,5);
            this.choix_key(98,10); //vrai si keyboard selectionne sinon faux
            this.creation_svg_y();
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

            var sound = game.add.sprite(x,this.y+x,'sound_on');
            this.sprites.push(sound);
            sound.width = 50;
            sound.height = 50;

            sound.son = "on";

            sound.inputEnabled = true;
            sound.events.onInputOver.add(sound_over, this); 
            sound.events.onInputOut.add(sound_out, this);
            sound.events.onInputDown.add(sound_listener,this);
        
        
        
    }
        menu(){
            
            function menu_over(item){
                item.loadTexture('menu');
            }
            function menu_out(item){
                item.loadTexture('menu1');
            }
            function menu_listener(item){
                suppretion_niveau();
                this.menu_const.affichage_choix_niveaux();
            }
            
            var menu = game.add.sprite(450,this.y+13, 'menu1');
            this.sprites.push(menu);
            
            menu.width = 30;
            menu.height = 40;

            menu.inputEnabled = true;
            menu.events.onInputOver.add(menu_over,this); 
            menu.events.onInputOut.add(menu_out, this);
            menu.events.onInputDown.add(menu_listener,this);
            
        }
        scroll(){
            
            
            console.log(in_game);
    
            function scroll_over(item) {
            item.loadTexture('scroll');
        }
            function scroll_out(item) {
            item.loadTexture('scroll1');
        }
            function scroll_listener(item) {
                
                            this.sprites.forEach(function(element) {
            element.bringToTop();
            });
                
                
            this.afficher = !this.afficher; 
            function descente(){
            
            if(this.afficher && this.x_actuel<this.taille_descente){
                this.x_actuel = this.x_actuel + this.vistesse_descente;
            }else if(this.x_actuel>this.x){
                this.x_actuel = this.x_actuel - this.vistesse_descente;  
            }
            
            var a = this;
            this.sprites.forEach(function(element) {
                element.y = element.y_svg + a.x_actuel;
            });
                
            if(this.x_actuel != 0){
                
                in_game = false;
            }else{
                in_game = true;
            }
            
        }
            game.time.events.repeat(Phaser.Timer.SECOND * 0.01,this.taille_descente/this.vistesse_descente +1, descente, this); 
    }
        
            var scroll = game.add.sprite(296-20,this.y+60,'scroll1');
            this.sprites.push(scroll);
            scroll.width = 40;
            scroll.height = 30;


            scroll.inputEnabled = true;
            scroll.events.onInputOver.add(scroll_over, this); 
            scroll.events.onInputOut.add(scroll_out, this);
            scroll.events.onInputDown.add(scroll_listener,this);
    
}//creation du sprite pour le scroll
        background_option(){
        
        var background = game.add.sprite(0,this.y, 'option_background');
        this.sprites.push(background);
        //background.anchor.setTo(0.5, 0.5);
        background.width = game.width;
        background.height =  this.taille_descente;
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
            //kb = false;
            var keyboard = game.add.sprite(x+70,this.y+y, 'Keyboard_all_vert');
            var touchScreen = game.add.sprite(x,this.y+y, 'TouchScreen_all');
        }else{
            //kb = true;
            var keyboard = game.add.sprite(x+70,this.y+y, 'Keyboard_all');
            var touchScreen = game.add.sprite(x,this.y+y, 'TouchScreen_all_vert');
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
            }else if(item.direction == "droite" && level_actuel != level_max-1 && level_actuel != level_max_atteind){
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
                start_level(this.niveau_actuel-1);
            }else if(item.direction == "droite" && level_actuel != level_max-1 && level_actuel != level_max_atteind){
                start_level(this.niveau_actuel+1);
            }
        }
    
        var fleche_gauche = game.add.sprite(30,this.y+30, 'fleche_gauche1');
        this.sprites.push(fleche_gauche);
        fleche_gauche.direction = "gauche"
        fleche_gauche.anchor.setTo(0.5, 0.5);
    
        fleche_gauche.width = 40;
        fleche_gauche.height = 40;
    
        fleche_gauche.inputEnabled = true;
        fleche_gauche.events.onInputOver.add(fleche_over,this); 
        fleche_gauche.events.onInputOut.add(fleche_out, this);
        fleche_gauche.events.onInputDown.add(fleche_listener,this);
    
    
    
        var fleche_droite = game.add.sprite(592-30,this.y+30, 'fleche_droite1');
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
            start_level(this.niveau_actuel);
        }
    
        var restart = game.add.sprite(400,this.y+30, 'restart1');
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
        var texte = game.add.text(296-40,this.y+10, level_actuel+"/"+level_max, style);
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