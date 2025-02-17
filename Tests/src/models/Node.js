import Edge from "./Edge"

export default class Node{
    inertia = 10
    constructor(x = 0, y = 0, angle = 1, m = 20, density = 0.5){
        this.x = x
        this.y = y
        this.angle = (angle + 2*Math.PI).toFixed(7)%(2*Math.PI)
        this.density = density
        this.m = m
        this.r = this.m/density

        this.dx = 0
        this.dy = 0
        this.do = 0
        this.energy = 0

        this.upperEdge = new Edge(this, undefined, 200, this.angle - 0.9*Math.PI);
        this.lowerEdge = new Edge(this, undefined, 200, (Math.PI + angle).toFixed(7)%(2*Math.PI) + 2);
        // this.lowerEdge = new Edge(this, undefined, 200, this.angle);
    }

    draw(context){
        let Fx = 0, Fy = 0
        
        const uTension = this.upperEdge?.tension()?? {x: 0, y: 0}
        const lTension = this.lowerEdge?.tension()?? {x: 0, y: 0}
        const uCompensation =  this.upperEdge?.compensatePhase((this.angle).toFixed(7)%(2*Math.PI)) ?? {x: 0, y: 0}
        const lCompensation = this.lowerEdge?.compensatePhase((Math.PI + this.angle).toFixed(7)%(2*Math.PI)) ?? {x: 0, y: 0}
        
        Fx += (uTension.x + lTension.x + uCompensation.x + lCompensation.x - 0.5*this.dx) 
        Fy += (uTension.y + lTension.y + uCompensation.y + lCompensation.y - 0.5*this.dy) 
        let T = (uCompensation.delta ?? 0) + (lCompensation.delta ?? 0)
       
        // console.log(this.upperEdge.anchor)
        // console.log(this.x, this.y)
        // console.log(Fx, Fy)
        // console.log("tt", this.upperEdge.tension())
        // console.log(this.upperEdge.speed())
        // console.log(this.upperEdge.elongation())
        // console.log(this.upperEdge.direction())
        // console.log("Plumk", uCompensation, uTension.x)
        // console.log("Plumk", lCompensation, uTension.x)

        const ax = Fx/this.m
        const ay = Fy/this.m
        const ao = T/this.inertia
        
        this.dx += ax
        this.dy += ay
        this.do += ao

        this.x += this.dx
        this.y += this.dy
        this.angle += this.do
        this.angle = (this.angle + (2*Math.PI)).toFixed(7) % (2*Math.PI)

        context.beginPath()
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        context.fill()

        this.upperEdge?.feed(4)
        this.lowerEdge?.feed(3)

        this.upperEdge?.draw(context)
        this.lowerEdge?.draw(context)

        console.log((this.angle * 180/Math.PI).toFixed(2))

    }

}
