export default class Edge{
    phaseK = 0.5
    phaseE = 0.5
    shrink = 1

    baseLength = 250
    branchWidth = 15
    maxBranchWidth = (1.5)*this.branchWidth
    minBranchWidth = (0.5)*this.branchWidth


    growthSpeed = 0.05

    static nHarmonics = 5 
    constructor(node, anchor, length, angle = 0, k = 0.03, e = 0.06){
        this.node = node
        this.anchor = anchor ?? new Anchor(node.x + length*Math.cos(angle), node.y + length*Math.sin(angle), this)
        // console.log("ancoraies", this.anchor.x, this.anchor.y)
        this.length = length
        this.lastLength = length
        this.dl = 0;
        this.k = k
        this.e = e
        this.energy = 0;

        this.time = 0;
        this.lDelta = undefined;

        this.lastValidDir = {x:0, y:0}
        this.growthPhases = Edge.generateDephases()
        this.growthFrequencies = Edge.generateFrequencies()
        this.growthDisplacements = Edge.generateDisplacements()
    }

    static generateDephases(){
        let res = Array.from({length: Edge.nHarmonics}, (_, i) => {
            return (2*Math.PI)*Math.random()
        })
        return res
    }
    
    static generateDisplacements(){
        let res = Array.from({length: Edge.nHarmonics}, (_, i) => {
            return (30)*(1 + 0.1*(Math.random()-0.5)/2)
        })
        return res
    }

    static generateFrequencies(){
        let res = Array.from({length: Edge.nHarmonics}, (_, i) => {
            return (10-i)*(1 + 0.3*(Math.random()-0.5)/2)/200
        })
        return res
    }

    direction(){
        if(!this.anchor) return  {x:0, y:0}

        const dx = this.anchor.x-this.node.x 
        const dy = this.anchor.y-this.node.y 

        if(dx==0 && dy==0) return {x: 0, y:0}
        
        const mod = Math.sqrt(dx*dx + dy*dy)
        const ux = dx/mod
        const uy = dy/mod
        
        return {x: ux, y: uy}
    }

    elongation(){
        if(!this.anchor) return  0

        const dx = this.anchor.x-this.node.x
        const dy = this.anchor.y-this.node.y

        return  Math.sqrt(dx*dx + dy*dy)
    }

    stretch(){
        if(!this.anchor) return  0

        const s = (this.elongation() - this.length)
        return s
    }

    speed(){
        return -(this.elongation() - this.lastLength)
    }

    tension(){
        if(!this.anchor) return {x: 0, y: 0}
        const modE =  this.k*this.stretch()
        const modD =  -this.e*this.speed();
        // console.log(modD)
        const mod = modE + modD
         return {x: this.direction().x*mod, y: this.direction().y*mod}
    }

    compensatePhase(theta){
        

        // if(!this.anchor || (this.elongation() < 10)) return {x: 0, y: 0}

        let alpha = Math.atan2(this.direction().y, this.direction().x)
        if (alpha < 0) alpha = (alpha+(2*Math.PI)).toFixed(7) % (2*Math.PI)
        let diff = Math.abs(theta - alpha)
        let dir = (theta >= alpha)? 1: -1;
        let delta = (diff < (2*Math.PI-diff))? dir*diff: -dir*(2*Math.PI-diff);  

        // console.log(delta)
        if(Math.abs(delta) < 1e-8){
            this.anchor.update({x: 0, y: 0})
            return {x: 0, y: 0}
        } 

        const dDelta = delta-(this.lDelta ?? delta) 
        this.lDelta = delta
        const elastic = this.phaseK*delta
        const dump = this.phaseE*dDelta
        const compound = (elastic + dump)

        // console.log(compound)
        // const compensation = {x: 0, y: 0}
        // this.anchor.update(compensation)
        // return compensation
        
        const compensation = {x: -this.direction().y*compound, y: this.direction().x*compound}
        this.anchor.update(compensation)
        return  {x: -compensation.x, y: -compensation.y, delta: -10*compound}
    }

    feed(energy){
        this.energy = Math.min(energy, 1)
    }

    draw(context){

        const noise = this.growthDisplacements.reduce((acc, displacement, index) => {
            return acc + (displacement*this.energy)*Math.sin(this.growthFrequencies[index]*this.time*this.energy + this.growthPhases[index])    
        }, 0)

        this.length = (this.node.r >= 10 || 200) + 300*this.energy*(1/(1+Math.exp(-this.time * this.energy * this.growthSpeed + 5))) 
        this.length <= 0? console.log( "Hijueputa"): false
        this.length += this.length+noise > this.node.r? noise: 0;
    

        this.lastLength = this.elongation()
        //console.log(this.length)

        this.time += 1
        context.beginPath()
        context.moveTo(this.node.x, this.node.y)
        if(this.anchor) context.lineTo(this.anchor.x, this.anchor.y)

        // console.log(this.node, this.anchor)
        context.strokeStyle = "black"; 
        const dynamicWidth = this.branchWidth*this.baseLength/this.elongation();
        context.lineWidth = Math.max(Math.min(dynamicWidth, this.maxBranchWidth), this.minBranchWidth);
        context.stroke();
    }
}

class Anchor{

    m = 0.1

    constructor(x, y, rootEdge, attachEdge, attachmentPoint=1){
        this.x = x
        this.y = y

        this.dx = 0;
        this.dy = 0;

        this.rootEdge = rootEdge
        this.attachEdge = attachEdge
        this.attachmentPoint = attachmentPoint
    }

    get attached(){
        return (this.attachEdge !== null)
    }

    netForce(){
        const at = this.attachEdge?.tension() ?? {x: 0, y: 0}
        const rt = this.rootEdge?.tension() ?? {x: 0, y: 0}
        return {x: -at.x -rt.x, y: -at.y - rt.y}
    }

    attach(edge){
        this.attachEdge = edge
        edge.anchor = this
    }

    update(compensation){
        const {x: cx, y: cy} = compensation
        const {x: nx, y: ny} = this.netForce()

        const fx = cx + nx - 0.05*this.dx
        const fy = cy + ny - 0.05*this.dy

        const ax = fx/this.m
        const ay = fy/this.m

        this.dx += ax
        this.dy += ay

        const nextx = this.x + this.dx
        const nexty = this.x + this.dy
        const distx = this.rootEdge.node.x - nextx
        const disty = this.rootEdge.node.y - nexty
        const dist = Math.sqrt(distx*distx + disty*disty)
        if(dist < this.rootEdge.node.r){
            this.dx = 0
            this.dy = 0
        }

        // if(this.rootEdge.elongation() < 10) return 
        this.x += this.dx
        this.y += this.dy
        return 
    }
}

export {Anchor}