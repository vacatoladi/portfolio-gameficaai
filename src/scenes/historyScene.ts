import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene{

    elementoTexto?:HTMLElement

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

        this.elementoTexto = document.createElement("div") as HTMLElement

        this.elementoTexto.style.opacity = "1"

        let containerGame =document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        this.elementoTexto.classList.add("sobre-gamifica")

        this.elementoTexto.innerHTML = `
        <h2>Sobre o GameficaAi</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
            usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
            experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
            equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
            desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

        

        let actorLogoVertical = new Actor({
            pos: vec (950 , engine.drawHeight/2-10)
        })
    
        let imagemLogoVertical = Resources.LogoVertical.toSprite()
    
        imagemLogoVertical.scale = vec(0.6, 0.6)
    
        actorLogoVertical.graphics.add(imagemLogoVertical)
        
        this.add(actorLogoVertical)

        this.input.keyboard.on("press", (event) =>{
            if(event.key == Keys.Enter){

                this.fadeOutElement(this.elementoTexto!)

                engine.goToScene("gamificacao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto?.remove()
    }

}