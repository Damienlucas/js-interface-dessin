
const pMessage = document.getElementById("p-message");
const colorMessage =  document.getElementById("color-message");
var thickness = 1;
// c est pour etre sur que toutes les ressources soient chargées
window.onload = () => {
    // on crée la palette
    document.querySelectorAll("#palette div").forEach(element => {
        element.style.backgroundColor = element.dataset.color
        // on appelle toutes les div et pour chacune on lui donne sa couleur

        // on met les couleurs
        element.style.backgroundColor = element.dataset.color;

        // on ecoute le click pour changer de couleur
        element.addEventListener("click", () =>{
            canvas.setColor(element.dataset.color);
        })
    })

//  on charge le canvas
    let canvas = new Dessin("#feuille");

    // on gere le click sur le +
    document.querySelector("#plus").addEventListener("click", () => {
        canvas.biggerStrocke();
    })

     // on gere le click sur le -
     document.querySelector("#moins").addEventListener("click", () => {
        canvas.smallerStrocke();
    })

     // on gere le click sur la gomme
     document.querySelector("#gomme").addEventListener("click", () => {
        canvas.setColor("white");
        // plutot qu effacer on colorie en blanc et on peut choisir l epaisseur de la gomme avec le + et le -
        pMessage.textContent = `Vous utilisez une gomme dont l'épaisseur est : ${thickness}`;
    })

    // on gere le click sur la croix
    document.querySelector("#effacer").addEventListener("click", () => {
        let valid = confirm("Attention! Vous avez choisi d'effacer votre dessin. Le voulez vous vraiment ?")
        if( valid == true ){
            canvas.erase();
        }
        else{
            return;
        }
       
    })

   
}
