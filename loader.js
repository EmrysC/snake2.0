class Bar{
    
    constructor(x,y,couleur_ligne,couleur_chargement,couleur_fond,longeur,largeur,epaisseur_ligne) {
        
        this.x = x;
        this.y = y;
        this.couleur_ligne = couleur_ligne;
        this.couleur_chargement = couleur_chargement;
        this.couleur_fond = couleur_fond;
        this.longeur = longeur;
        this.largeur = largeur;
        this.epaisseur_ligne = epaisseur_ligne;
        this.pourcentage = 0;
        this.graphics = null;
        this.graphics1 = null;
        
        this.graphics1 = game.add.graphics(this.x, this.y);
        this.graphics1.beginFill(couleur_fond);
        this.graphics1.lineStyle(this.epaisseur_ligne, this.couleur_ligne, 1);
        this.graphics1.moveTo(-this.epaisseur_ligne/2,-this.epaisseur_ligne/2);
        this.graphics1.lineTo(this.longeur+this.epaisseur_ligne/2,-this.epaisseur_ligne/2);
        this.graphics1.lineTo(this.longeur+this.epaisseur_ligne/2, this.largeur+this.epaisseur_ligne/2);
        this.graphics1.lineTo(-this.epaisseur_ligne/2, this.largeur+this.epaisseur_ligne/2);
        this.graphics1.lineTo(-this.epaisseur_ligne/2, -this.epaisseur_ligne/2);
        this.graphics1.endFill();
        
        
    }
    
changement_pourcentage(pourcentage){
        
    this.pourcentage = pourcentage;
    
    if(this.graphics != null){
        this.graphics.destroy();
    }

    
    this.graphics = game.add.graphics(this.x, this.x);

    this.graphics.beginFill(this.couleur_chargement);
    

    this.graphics.lineTo(this.longeur*(this.pourcentage/100),0);
    this.graphics.lineTo(this.longeur*(this.pourcentage/100), this.largeur);
    this.graphics.lineTo(0, this.largeur);
    this.graphics.lineTo(0,0);
    this.graphics.endFill();
        
    }
    
};






game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

}

function create() {

    game.stage.backgroundColor = '#182d3b';
    
    game.load.onLoadStart.add(loadStart, this); // apelle avant le chargement
    game.load.onFileComplete.add(fileComplete, this);// appelle a chaque fichier charge
    game.load.onLoadComplete.add(loadComplete, this);// appelle une fois que tous les fichiers sont charges
    start();//function qui charge les images


}

function start() {

    game.load.image('picture1', 'image/snake_tete.png');
    game.load.image('picture2', 'image/snake_tete.png');
    game.load.image('picture3', 'image/snake_tete.png');
    game.load.image('picture4', 'image/snake_tete.png');
    game.load.image('picture5', 'image/snake_tete.png');
    game.load.image('picture6', 'image/snake_tete.png');
    game.load.image('picture7', 'image/snake_tete.png');

    game.load.start();
    
}



function loadStart(){
    
    chargement = new Bar(50,50,0xFFD900,0xFF3300,0xFFFFFF,500,50,10); // ReferenceError
  
}
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

//	console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

    chargement.changement_pourcentage(progress);

}
function loadComplete() {

	console.log("telechargement complet");
    //chargment.graphics.destroy();     //pour detuire les graphics
    //chargment.graphics1.destroy();

}
