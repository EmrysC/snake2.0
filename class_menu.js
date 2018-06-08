////////////////////////////////////////
////gestion du menu/////////////////////
////////////////////////////////////////


class Menu{
    
    constructor(game,nb_niveau,niveau_max,background_color){
        this.game = game;
        this.nb_niveau = nb_niveau;
        this.niveau_max = niveau_max;
        this.background_color = background_color;
        
        this.boutton_niveaux = [];   //contient touts les objets crees pour la selection des niveau
        
        this.game.stage.backgroundColor = this.background_color;
        
    }
    
    creer_bouton_level(x,y,num){
        
       // console.log(this.boutton_niveaux);
    
    var sprite = this.game.add.sprite(x, y, 'choix2');
    sprite.width = 50;
    sprite.height = 50;
    
    if(num > this.niveau_max){
        
            //si le niveau est bloque
        
            sprite.alpha=.5;
        
            var cadena = this.game.add.sprite(x+33, y+30, 'cadena');
            cadena.width = 10;
            cadena.height = 15;
        
            this.boutton_niveaux.push(cadena);
        
    }else{
        
            sprite.inputEnabled = true;
            sprite.events.onInputOver.add(over, this); 
            sprite.events.onInputOut.add(out, this);
        
            sprite.num = num;
            
            sprite.events.onInputDown.add(this.listener,num);
        
	    
            function over(item) {
               sprite.loadTexture('choix1');
		      }
            function out(item) {
            
             sprite.loadTexture('choix2');
            


		}
        
    }
    

   
     var text = this.game.add.text(x+25,y+27,num);
     text.anchor.setTo(0.5);
    
    
     this.boutton_niveaux.push(sprite);
     this.boutton_niveaux.push(text);
     
    
    
}// creer un bouton de la selection des niveau

    affichage_choix_niveaux(){
        
        console.log(this.nb_niveau);
    
        var j = 1;
        var k = 1;
   
        for (var i = 0; i < this.nb_niveau; i++) {
            if(this.game.width < k*60+60){
                k=1;
                j=j+1;
            }
    
            this.creer_bouton_level(60*k,60*j,i);
            k=k+1;
}

    
}//affichage du menu de selection des niveaux
    
    destroy_selection_niveau(){
    
        this.boutton_niveaux.forEach(function(element) {
            element.destroy();
        });
    
}// detruit tout ce qui est creer lors de la selection des niveaux
    
    lancer_niveau(num){
    
    this.destroy_selection_niveau();
    creation_jeu(num);//a faire passer enparametre
    
}
    
    listener(spr) {
                
    menu.lancer_niveau(spr.num);

}// ecoute les sprite pour la selection des niveaux
    
    
};

