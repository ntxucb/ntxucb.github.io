import Node from "./Node.js"

export default class NodeCluster{
    constructor(nodes = []){
        this.nodes = nodes
        this.mouseIn = false
        this.mouseX = undefined
        this.mouseY = undefined;
    }

    addNode(node){
        this.nodes.push(node)
    }

    createNode(x, y, angle=undefined, m=undefined){
        this.nodes.push(new Node(x, y, angle, m))
    }

    updateMouse(x, y){
        this.mouseIn = true;
        this.mouseX = x;
        this.mouseY = y;
    }

    #feed(x, y, power = 100){
        this.nodes.forEach((node) => {
            const dx = node.x - x
            const dy = node.y - y
            const dist = Math.sqrt(dx*dx + dy*dy)
            node.feed(power/(dist**2+1))
        })
    }

    draw(context){
        if(this.mouseIn){
            this.#feed(this.mouseX, this.mouseY)
        }
        this.nodes.forEach((node) => {
            node.draw(context);
        })
    }
}