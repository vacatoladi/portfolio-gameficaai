import { Actor, CollisionType, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {

    private velocidade: number = 180

    constructor() {
        super({
            pos: vec(600,632),
            width: 32,
            height:32,
            name:"Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }


    onInitialize(engine: Engine<any>): void {
        engine.input.keyboard.on("hold", (event) =>{
            switch (event.key){
                case Keys.ArrowLeft: case Keys.A:

                    this.vel.x = -this.velocidade

                    break;
                
                case Keys.ArrowRight: case Keys.D:

                    this.vel.x = this.velocidade

                    break;

                case Keys.ArrowUp: case Keys.W:

                    this.vel.y = -this.velocidade

                    break;

                case Keys.ArrowDown: case Keys.S:

                    this.vel.y = this.velocidade

                    break;

                default:
                    break;
            }
        })

        engine.input.keyboard.on("release", (event) =>{
            if(event.key == Keys.A || event.key == Keys.ArrowLeft){
                this.vel.x = 0
            }
            if(event.key == Keys.D || event.key == Keys.ArrowRight){
                this.vel.x = 0
            }
            if(event.key == Keys.W || event.key == Keys.ArrowUp){
                this.vel.y = 0
            }
            if(event.key == Keys.S || event.key == Keys.ArrowDown){
                this.vel.y = 0
            }

            // if(event.key == Keys.A || event.key == Keys.ArrowLeft || event.key == Keys.D || event.key == Keys.ArrowRight){
            //     this.vel.x = 0
            // }
            // if(event.key == Keys.W || event.key == Keys.ArrowUp || event.key == Keys.S || event.key == Keys.ArrowDown){
            //     this.vel.y = 0
            // }


        })
    }


}
