import { Engine , Color, Scene, FadeInOut, Actor, vec, Transition, SceneActivationContext, Keys } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene{

    elementoTexto2?:HTMLElement

    fadeOutElement(elemento: HTMLElement){
        let opacidade = parseFloat(elemento.style.opacity)

        setInterval(() =>{
            if(opacidade > 0){
                opacidade -= 0.01
    
                elemento.style.opacity = opacidade.toString()
            }
        },10)

    }

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }




    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        this.elementoTexto2 = document.createElement("div") as HTMLElement

        this.elementoTexto2.style.opacity = "1"

        let containerGame =document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto2)

        this.elementoTexto2.classList.add("oque-gamifica")

        this.elementoTexto2.innerHTML = `
        <h2>O que é gamificação?</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`






        let actorImagemGamificacao = new Actor({
            pos: vec (285 , engine.drawHeight/2-10)
        })
    
        let imagemGamificacao = Resources.ImgGamificacao.toSprite()
    
        imagemGamificacao.scale = vec(0.9, 0.9)
    
        actorImagemGamificacao.graphics.add(imagemGamificacao)
        
        this.add(actorImagemGamificacao)

        this.input.keyboard.on("press", (event) =>{
            if(event.key == Keys.Enter){

                this.fadeOutElement(this.elementoTexto2!)

                engine.goToScene("exposicao")
            }
        })

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto2?.remove()
    }

    
}