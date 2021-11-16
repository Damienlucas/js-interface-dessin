class Dessin{
    
    constructor(canvas){
        this.draw = false;
        // est ce que je suis en train de dessiner? la faux donc non
        this.prevX = 0;
        this.prevY = 0;
        // ce sont les coordonnées précédentes de la zone où on se trouvait

        this.canvas = document.querySelector(canvas);
        // permet de récupérer la feuille canvas
        this.ctx = this.canvas.getContext("2d");
        // pour créer le conteste du canvas
        this.ctx.strokeStyle = "black";
        // couleur par default est le noir
        this.ctx.lineWidth = 2;
        // épaisseur de trait par défault est de 2

        // on va mettre en place les écoutes d'évennements comme click de la souris, sortir du cadre, etc
        this.canvas.addEventListener("mousedown", (e) => {
            // je dessinne
            this.draw = true;
           
            // je stocke les coordonnées de départ
            this.prevX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth;
            // on récupère les coordonnées avec e.clientX et on les soustrait aux coordonnées de départ - si on fait pas de responsive on pourrait s'arreter la mais comme on veut gaire du responsive il faut calculer par rapport aux dimensions données à l origine (ici 400) que l on divise par les dimensions réellement affichées à l'écran actuellement (en fonction de la taille de l'écran)
            this.prevY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight;
        })
        this.canvas.addEventListener("touchstart", (e) => {
            // je dessinne
            this.draw = true;
           
            // je stocke les coordonnées de départ
            this.prevX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth;
            // on récupère les coordonnées avec e.clientX et on les soustrait aux coordonnées de départ - si on fait pas de responsive on pourrait s'arreter la mais comme on veut gaire du responsive il faut calculer par rapport aux dimensions données à l origine (ici 400) que l on divise par les dimensions réellement affichées à l'écran actuellement (en fonction de la taille de l'écran)
            this.prevY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight;
        })
        this.canvas.addEventListener("mousemove", (e) => {
            if(this.draw){
                // on calcule les coordonées
                // on verifie si on dessine donc on recupere les emplacements ou est la souris quand elle se deplace
                let currX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth;
                let currY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight;
                // maintenant on va envoyer les coordonnées pour dessiner

                // on dessine
                this.dessine(this.prevX, this.prevY, currX, currY);
                
               // on stocke les nouvelles coordonées
                this.prevX = currX;
                this.prevY = currY;
            }
        })
        this.canvas.addEventListener("touchmove", (e) => {
            if(this.draw){
                // on calcule les coordonées
                // on verifie si on dessine donc on recupere les emplacements ou est la souris quand elle se deplace
                let currX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth;
                let currY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight;
                // maintenant on va envoyer les coordonnées pour dessiner

                // on dessine
                this.dessine(this.prevX, this.prevY, currX, currY);
                
                // on stocke les nouvelles coordonées
                this.prevX = currX;
                this.prevY = currY;
            }
        })
        // maintenant on met une nouvelle ecoute  tu arretes de dessiner quand on lache la souris
        this.canvas.addEventListener("mouseup", () => {
            this.draw = false;
        })
        this.canvas.addEventListener("touchend", () => {
            this.draw = false;
        })
        // et quand on sort de la feuille
        this.canvas.addEventListener("mouseout", () => {
            this.draw = false;
        })

    }

    dessine(depX, depY, destX, destY){
        this.ctx.beginPath();
        // je dis je commence à dessiner
        this.ctx.moveTo(depX, depY);
        // je place mon crayon à un endroit précis de depart
        this.ctx.lineTo(destX, destY);
        // et la on lui dit de tracer le trait
        this.ctx.closePath();
        // pour fermer le chemin
        this.ctx.stroke();
        // la on dit de dessiner
        
    }
// pour changer de couleurs mais il faut aussi faire dans la palette
    setColor(color){
        this.ctx.strokeStyle = color;
        pMessage.textContent = `Vous utilisez un crayon dont l'épaisseur est : ${thickness} et la couleur :`;
        colorMessage.style.backgroundColor = color;
    }

    // on met en place l outil +
    biggerStrocke(){
        this.ctx.lineWidth++;
        thickness++;
        pMessage.textContent = `Vous utilisez un crayon dont l'épaisseur est : ${thickness} et la couleur :`;
    }

    // on met en place l outil -
    smallerStrocke(){
        // attention on peut pas mettre directement - car on peut pas descendre en dessous de zero sinon on aurait plus de trait donc si on est superieur à 1 on fait l operation
        this.ctx.lineWidth = (this.ctx.lineWidth > 1 ) ? this.ctx.lineWidth - 1 : 1;
        // c est écrit en ternaire   si lineWidth>1 alors on enleve 1 sinon on laisse à 1
        if(thickness > 1){
            thickness--;
            pMessage.textContent = `Vous utilisez un crayon dont l'épaisseur est : ${thickness} et la couleur :`;
        }
    }

    // on efface
    erase(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}