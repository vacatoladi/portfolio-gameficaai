import { Actor, Animation, CollisionType, Color, Engine, FadeInOut, Scene, SpriteSheet, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

export class expoScene extends Scene{


    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // engine.toggleDebug()

        let musicaFundo = Resources.RitmoBGM

        musicaFundo.loop = true
        musicaFundo.play(0.)

        let tiledMap = Resources.Mapa

        let offsetX = 138
        let offsetY = 100
        let offsetY2 = 80

        

        tiledMap.addToScene(this, {
            pos: vec(offsetX,offsetY),
        })

        this.camera.zoom = 1.4

        let spawnPoint = tiledMap.getObjectsByName("spawnpoint")[0]

        let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        jogador.z = 2

        this.add(jogador)

        let npcSpawnPointA= tiledMap.getObjectsByName("npcSpawnPoint_a")[0]
        let npcSpawnPointB= tiledMap.getObjectsByName("npcSpawnPoint_b")[0]
        let npcSpawnPointC= tiledMap.getObjectsByName("npcSpawnPoint_c")[0]

        let npcA = new Npc(vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),"npcA","A")
        let npcB = new Npc(vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),"npcB","B")
        let npcC = new Npc(vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),"npcC","C")

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

        const duracaoFrameAnimacao = 90

        const NpcADownIdle = new Animation({
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

        npcA.graphics.add("NpcA-down-idle", NpcADownIdle)

        npcA.graphics.use("NpcA-down-idle")

        const NpcBDownIdle = new Animation({
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

        npcB.graphics.add("NpcB-down-idle", NpcBDownIdle)

        npcA.graphics.use("NpcB-down-idle")

        const NpcCDownIdle = new Animation({
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

        npcC.graphics.add("NpcC-down-idle", NpcCDownIdle)

        npcA.graphics.use("NpcC-down-idle")


        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        this.camera.strategy.lockToActor(jogador)

        let camadaObjetosColisores = tiledMap.getObjectLayers("colisores")[0]

        console.log(camadaObjetosColisores)

        camadaObjetosColisores.objects.forEach(objeto => {
            
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY2 + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
                // color: Color.Red
            })

            this.add(objetoAtual)

        })
    }

}