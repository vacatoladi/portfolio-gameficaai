import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Resource, Scene, TextAlign, Transition, vec } from "excalibur"
import { Resources } from "../resources"



export class welcomeScene extends Scene{

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Black

        let fraseBemVindo = new Label({
            text:`Bem Vindo ao Portfólio`,
            width:400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size:40,
                textAlign: TextAlign.Center,
                family:'anta'
            })
        })

        this.add(fraseBemVindo)

        let actorLogo = new Actor({
            pos: vec (engine.drawWidth / 2, 430),
            color: Color.Red
        })

        let imagemLogo = Resources.Logo.toSprite()

        imagemLogo.scale = vec(0.4, 0.4)

        actorLogo.graphics.add(imagemLogo)
        
        this.add(actorLogo)

        let fraseEnter = new Label({
            text:`Pressione "Enter" para iniciar...`,
            width: 300,
            height:20,
            pos: vec(engine.drawWidth / 2, 630),
            font: new Font({
                color: Color.White,
                size:16,
                textAlign: TextAlign.Center,
                family:'anta'
            })
        })
        let ij = 0

            

        fraseEnter.actions.repeatForever( (ctx) => {
            ctx.fade(0,850).fade(1,850).delay(200)
        })

        this.add(fraseEnter)

        this.input.keyboard.on("press", (event) => {
            if(event.key == Keys.Enter){
                engine.goToScene("historia")
            }
        })
    }
}   