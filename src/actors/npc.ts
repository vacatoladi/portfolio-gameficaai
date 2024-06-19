import { Actor, Animation, CollisionType, Color, Engine, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";


export class Npc extends Actor {

    constructor(posicao: Vector, nome:string, npc:string){
        super({
            pos:posicao,
            width:32,
            height:32,
            name: nome,
            
            collisionType: CollisionType.Fixed
        })

        
        const npcASpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcASpriteSheet,
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
        
        const duracaoFrameAnimacao = 90

        const NpcAIdle = new Animation({
            frames: [
                { graphic: npcASpriteSheet.getSprite(18,1)},
                { graphic: npcASpriteSheet.getSprite(19,1)},
                { graphic: npcASpriteSheet.getSprite(20,1)},
                { graphic: npcASpriteSheet.getSprite(21,1)},
                { graphic: npcASpriteSheet.getSprite(22,1)},
                { graphic: npcASpriteSheet.getSprite(23,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })

        this.graphics.add("npc-idleA",NpcAIdle)

        const npcBSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcBSpriteSheet,
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
        

        const NpcBIdle = new Animation({
            frames: [
                { graphic: npcBSpriteSheet.getSprite(18,1)},
                { graphic: npcBSpriteSheet.getSprite(19,1)},
                { graphic: npcBSpriteSheet.getSprite(20,1)},
                { graphic: npcBSpriteSheet.getSprite(21,1)},
                { graphic: npcBSpriteSheet.getSprite(22,1)},
                { graphic: npcBSpriteSheet.getSprite(23,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })

        this.graphics.add("npc-idleB",NpcBIdle)

        const npcCSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcCSpriteSheet,
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
        

        const NpcCIdle = new Animation({
            frames: [
                { graphic: npcCSpriteSheet.getSprite(18,1)},
                { graphic: npcCSpriteSheet.getSprite(19,1)},
                { graphic: npcCSpriteSheet.getSprite(20,1)},
                { graphic: npcCSpriteSheet.getSprite(21,1)},
                { graphic: npcCSpriteSheet.getSprite(22,1)},
                { graphic: npcCSpriteSheet.getSprite(23,1)}
            ],
            frameDuration:duracaoFrameAnimacao
        })

        this.graphics.add("npc-idleC",NpcCIdle)









        this.graphics.use("npc-idle"+npc)


        
    }

}

