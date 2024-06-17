import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
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

        let npcA = new Npc(vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),Color.Blue,"npcA")
        let npcB = new Npc(vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),Color.Red,"npcB")
        let npcC = new Npc(vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),Color.Green,"npcC")

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