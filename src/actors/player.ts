import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {

    private velocidade: number = 180
    private ultimaDirecao: string = "down"

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height:38,
            name:"Jogador",
            color: Color.Black,
            collisionType: CollisionType.Active
        })
    }


    onInitialize(engine: Engine<any>): void {


        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth:32,
                spriteHeight:64,
                columns:56,
                rows:20
            },
            spacing: {
                originOffset: {
                    y:0,
                },
                margin:{
                    y:0
                },
                
            }

        })


        enum AnimationStrategy {
            End = 'end'
        }


        const duracaoFrameAnimacao = 90

        const leftIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12,1)},
                { graphic: playerSpriteSheet.getSprite(13,1)},
                { graphic: playerSpriteSheet.getSprite(14,1)},
                { graphic: playerSpriteSheet.getSprite(15,1)},
                { graphic: playerSpriteSheet.getSprite(16,1)},
                { graphic: playerSpriteSheet.getSprite(17,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })


        const rightIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0,1)},
                { graphic: playerSpriteSheet.getSprite(1,1)},
                { graphic: playerSpriteSheet.getSprite(2,1)},
                { graphic: playerSpriteSheet.getSprite(3,1)},
                { graphic: playerSpriteSheet.getSprite(4,1)},
                { graphic: playerSpriteSheet.getSprite(5,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })

        const upIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6,1)},
                { graphic: playerSpriteSheet.getSprite(7,1)},
                { graphic: playerSpriteSheet.getSprite(8,1)},
                { graphic: playerSpriteSheet.getSprite(9,1)},
                { graphic: playerSpriteSheet.getSprite(10,1)},
                { graphic: playerSpriteSheet.getSprite(11,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })
        const downIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18,1)},
                { graphic: playerSpriteSheet.getSprite(19,1)},
                { graphic: playerSpriteSheet.getSprite(20,1)},
                { graphic: playerSpriteSheet.getSprite(21,1)},
                { graphic: playerSpriteSheet.getSprite(22,1)},
                { graphic: playerSpriteSheet.getSprite(23,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })
        const leftWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12,2)},
                { graphic: playerSpriteSheet.getSprite(13,2)},
                { graphic: playerSpriteSheet.getSprite(14,2)},
                { graphic: playerSpriteSheet.getSprite(15,2)},
                { graphic: playerSpriteSheet.getSprite(16,2)},
                { graphic: playerSpriteSheet.getSprite(17,2)}
            ],
            frameDuration:duracaoFrameAnimacao
        })

        const rightWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0,2)},
                { graphic: playerSpriteSheet.getSprite(1,2)},
                { graphic: playerSpriteSheet.getSprite(2,2)},
                { graphic: playerSpriteSheet.getSprite(3,2)},
                { graphic: playerSpriteSheet.getSprite(4,2)},
                { graphic: playerSpriteSheet.getSprite(5,2)}
            ],
            frameDuration:duracaoFrameAnimacao,
            
        })

        const upWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6,2)},
                { graphic: playerSpriteSheet.getSprite(7,2)},
                { graphic: playerSpriteSheet.getSprite(8,2)},
                { graphic: playerSpriteSheet.getSprite(9,2)},
                { graphic: playerSpriteSheet.getSprite(10,2)},
                { graphic: playerSpriteSheet.getSprite(11,2)}
            ],
            frameDuration:duracaoFrameAnimacao
        })
        const downWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18,2)},
                { graphic: playerSpriteSheet.getSprite(19,2)},
                { graphic: playerSpriteSheet.getSprite(20,2)},
                { graphic: playerSpriteSheet.getSprite(21,2)},
                { graphic: playerSpriteSheet.getSprite(22,2)},
                { graphic: playerSpriteSheet.getSprite(23,2)}
            ],
            frameDuration:duracaoFrameAnimacao
        })

        const openBook = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0,6) },
                { graphic: playerSpriteSheet.getSprite(1,6) },
                { graphic: playerSpriteSheet.getSprite(2,6) },
                { graphic: playerSpriteSheet.getSprite(3,6) },
                { graphic: playerSpriteSheet.getSprite(4,6) },
                { graphic: playerSpriteSheet.getSprite(5,6) }
            ],
            frameDuration:duracaoFrameAnimacao,
            strategy: AnimationStrategy.End 
        })

        const closeBook = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6,6) },
                { graphic: playerSpriteSheet.getSprite(7,6) },
                { graphic: playerSpriteSheet.getSprite(8,6) },
                { graphic: playerSpriteSheet.getSprite(9,6) },
                { graphic: playerSpriteSheet.getSprite(10,6) },
                { graphic: playerSpriteSheet.getSprite(11,6) }
            ],
            frameDuration:duracaoFrameAnimacao,
            strategy: AnimationStrategy.End
        })

        const readBook = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0,7) },
                { graphic: playerSpriteSheet.getSprite(1,7) },
                { graphic: playerSpriteSheet.getSprite(2,7) },
                { graphic: playerSpriteSheet.getSprite(3,7) },
                { graphic: playerSpriteSheet.getSprite(4,7) },
                { graphic: playerSpriteSheet.getSprite(5,7) },
                { graphic: playerSpriteSheet.getSprite(6,7) },
                { graphic: playerSpriteSheet.getSprite(7,7) },
                { graphic: playerSpriteSheet.getSprite(8,7) },
                { graphic: playerSpriteSheet.getSprite(9,7) },
                { graphic: playerSpriteSheet.getSprite(10,7) },
                { graphic: playerSpriteSheet.getSprite(11,7) }
            ],
            frameDuration:duracaoFrameAnimacao,
            
        })



        this.graphics.add("down-walk", downWalk)
        this.graphics.add("up-walk", upWalk)
        this.graphics.add("left-walk", leftWalk)
        this.graphics.add("right-walk", rightWalk)

        this.graphics.add("down-idle", downIdle)
        this.graphics.add("up-idle", upIdle)
        this.graphics.add("left-idle", leftIdle)
        this.graphics.add("right-idle", rightIdle,)

        this.graphics.add("open-book",openBook)
        this.graphics.add("close-book",closeBook)
        this.graphics.add("read-book",readBook)
        

        this.graphics.use("down-idle")

        openBook.events.on('end', () => {
            this.graphics.use("read-book")
            engine.input.keyboard.on("press", (event) =>{
                if(event.key == Keys.B){
                    this.graphics.use("close-book")
                }
            })
        })
        
        closeBook.events.on('end',() =>{
            this.graphics.use("down-idle")
            

        })

        // let imagePlayer = playerSpriteSheet.getSprite(3,0)
        // imagePlayer.scale = vec(0.85,0.85)
        // this.graphics.add(imagePlayer)


        engine.input.keyboard.on("hold", (event) =>{
            switch (event.key){
                case Keys.ArrowLeft: case Keys.A:

                    this.vel.x = -this.velocidade
                    this.graphics.use("left-walk")

                    this.ultimaDirecao = "left"
                    break;
                
                case Keys.ArrowRight: case Keys.D:

                    this.vel.x = this.velocidade
                    this.graphics.use("right-walk")

                    this.ultimaDirecao = "right"
                    break;

                case Keys.ArrowUp: case Keys.W:

                    this.vel.y = -this.velocidade
                    this.graphics.use("up-walk")

                    this.ultimaDirecao = "up"
                    break;

                case Keys.ArrowDown: case Keys.S:

                    this.vel.y = this.velocidade
                    this.graphics.use("down-walk")

                    this.ultimaDirecao = "down"
                    break;

                case Keys.Enter:
                    this.vel.x = 0
                    this.vel.y = 0
                    this.graphics.use("open-book")
                    
                    break;

                default:
                    break;
            }
        })

        engine.input.keyboard.on("release", (event) =>{
            if(event.key == Keys.A || event.key == Keys.ArrowLeft){
                this.vel.x = 0
                this.graphics.use("left-idle")
            }
            if(event.key == Keys.D || event.key == Keys.ArrowRight){
                this.vel.x = 0
                this.graphics.use("right-idle")
            }
            if(event.key == Keys.W || event.key == Keys.ArrowUp){
                this.vel.y = 0
                this.graphics.use("up-idle")
            }
            if(event.key == Keys.S || event.key == Keys.ArrowDown){
                this.vel.y = 0
                this.graphics.use("down-idle")
            }

            // if(event.key == Keys.A || event.key == Keys.ArrowLeft || event.key == Keys.D || event.key == Keys.ArrowRight){
            //     this.vel.x = 0
            // }
            // if(event.key == Keys.W || event.key == Keys.ArrowUp || event.key == Keys.S || event.key == Keys.ArrowDown){
            //     this.vel.y = 0
            // }
            // if(this.vel.x == 0 && this.vel.y == 0) {
            //     this.graphics.use(this.ultimaDirecao + "-idle")
            // }


        })

        engine.input.keyboard.on("press", (event) =>{
            
            if(event.key == Keys.F && this.temObjetoProximo) {
                
                if(this.ultimoColisor?.owner.name == "mesa_stand_a"){
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
                if(this.ultimoColisor?.owner.name == "mesa_stand_b"){
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
                if(this.ultimoColisor?.owner.name == "mesa_stand_c"){
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }


            }

        })


    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        this.temObjetoProximo = true

        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos)> 80) {
            this.temObjetoProximo = false
            console.log("Está longe");
        }
    }

}
