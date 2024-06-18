import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene{

    private imagemMesa: any

    private mesaImagem: any

    private objetoInteracao: any

    private textoDaCena: string = ""

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

    onInitialize(Engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        this.elementoTexto = document.createElement("div") as HTMLElement

        this.elementoTexto.style.opacity = "1"

        let containerGame =document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        this.elementoTexto.classList.add("case-gamifica")

        this.mesaImagem = new Actor({
            pos: vec (950 , this.engine.drawHeight/2+10)
        })
    
        this.add(this.mesaImagem)

        this.input.keyboard.on("press", (event) =>{
            if(event.key == Keys.Enter){

                this.fadeOutElement(this.elementoTexto!)

                this.engine.goToScene("exposicao")
            }
        })

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto?.classList.add("displayNone")
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        this.elementoTexto?.classList.remove("displayNone")
        
        this.elementoTexto!.style.opacity ="1"
        
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao)

        if(this.objetoInteracao.nomeDoActor == "mesa_stand_a"){
            this.textoDaCena = `
            <h2>Aumento da Produtividade na XYZ Corp</h2>
            <p>Desafio: A XYZ Corp enfrentava desafios significativos com a baixa produtividade de seus funcionários. A equipe de vendas, em particular, estava tendo dificuldades em atingir suas metas mensais.</p>
            <p>Solução: A empresa de gamificação empresarial implementou um sistema de recompensas gamificado, onde os vendedores ganhavam pontos por cada venda, contato com cliente e treinamento concluído. Esses pontos poderiam ser trocados por prêmios e reconhecimentos.</p>
            <p>Resultados: Em apenas três meses, a XYZ Corp viu um aumento de 35% na produtividade da equipe de vendas. Além disso, o engajamento dos funcionários aumentou significativamente, com uma redução de 20% na rotatividade. Os funcionários estavam mais motivados e satisfeitos, resultando em um ambiente de trabalho mais positivo e produtivo.</p>`

            this.elementoTexto!.innerHTML = this.textoDaCena
            
            this.imagemMesa = Resources.CaseAImage.toSprite()
    
            this.imagemMesa.scale = vec(2.5, 2.5)

            this.mesaImagem.graphics.add(this.imagemMesa)
            
        }
        if(this.objetoInteracao.nomeDoActor == "mesa_stand_b"){
            this.textoDaCena = `
        <h2>Melhoria na Retenção de Funcionários na ABC Tech</h2>
        <p>Desafio: A ABC Tech sofria com uma alta taxa de rotatividade, o que gerava altos custos com recrutamento e treinamento de novos funcionários.</p>
        <p>Solução: A empresa de gamificação implementou um programa de onboarding gamificado que incluía desafios, missões e um sistema de pontos para os novos funcionários. Este programa foi projetado para tornar o processo de integração mais envolvente e divertido.</p>
        <p>Resultados: A taxa de retenção de funcionários na ABC Tech melhorou em 40% após a implementação do programa de onboarding gamificado. Os novos funcionários relataram sentir-se mais bem-vindos e preparados para suas funções, o que resultou em uma integração mais rápida e eficiente.</p>`

            this.elementoTexto!.innerHTML = this.textoDaCena

            this.imagemMesa = Resources.CaseBImage.toSprite()
    
            this.imagemMesa.scale = vec(2.5, 2.5)

            this.mesaImagem.graphics.add(this.imagemMesa)
            
        }
        if(this.objetoInteracao.nomeDoActor == "mesa_stand_c"){
            this.textoDaCena = `
            <h2> Engajamento de Funcionários na Innovate Solutions</h2>
            <p>Desafio: A Innovate Solutions tinha dificuldade em engajar seus funcionários em programas de treinamento e desenvolvimento profissional.</p>
            <p>Solução: A empresa de gamificação empresarial criou um sistema de aprendizado gamificado, onde os funcionários podiam ganhar badges, subir de nível e competir em rankings através da participação em cursos e workshops. Além disso, desafios semanais e competições entre equipes foram introduzidos para estimular a participação contínua.</p>
            <p>Resultados: A participação nos programas de treinamento aumentou em 50% dentro de seis meses. Os funcionários não apenas estavam mais engajados, mas também relataram uma maior satisfação com as oportunidades de desenvolvimento profissional oferecidas pela empresa. A Innovate Solutions também observou um aumento de 15% na performance geral dos funcionários, refletindo o impacto positivo do aprendizado contínuo.</p>`
    
            this.elementoTexto!.innerHTML = this.textoDaCena

            this.imagemMesa = Resources.CaseCImage.toSprite()
    
            this.imagemMesa.scale = vec(2.5, 2.5)

            this.mesaImagem.graphics.add(this.imagemMesa)
        }
    }
}