import Edge from "./Edge";

export default class Node {
  inertia = 10;
  maxCapacity = 1;
  feedRate = 0.1;
  consumeRate = 0.02;
  constructor(x = 0, y = 0, angle = 1, m = 10, density = 0.5) {
    this.x = x;
    this.y = y;
    this.angle = (angle + 2 * Math.PI).toFixed(7) % (2 * Math.PI);
    this.density = density;
    this.m = m;
    this.r = this.m / density;

    this.dx = 0;
    this.dy = 0;
    this.do = 0;
    this.energy = 0;

    this.upperEdge = new Edge(
      this,
      undefined,
      this.angle // + 0.5 * (2 * Math.random() - 1)
    );  
    this.lowerEdge = new Edge(
      this,
      undefined,
      ((Math.PI + angle).toFixed(7) % (2 * Math.PI)) //+ 0.5 * (2 * Math.random() - 1)
    );
  }

  feed(power) {
    this.energy += this.feedRate * (this.maxCapacity - this.energy) * power;
    if (this.energy >= this.maxCapacity) this.energy = this.maxCapacity;
  }

  draw(context) {
    let Fx = 0,
      Fy = 0;

    const uTension = this.upperEdge?.tension() ?? { x: 0, y: 0 };
    const lTension = this.lowerEdge?.tension() ?? { x: 0, y: 0 };
    const uCompensation = this.upperEdge?.compensatePhase(
      this.angle.toFixed(7) % (2 * Math.PI)
    ) ?? { x: 0, y: 0 };
    const lCompensation = this.lowerEdge?.compensatePhase(
      (Math.PI + this.angle).toFixed(7) % (2 * Math.PI)
    ) ?? { x: 0, y: 0 };

    Fx +=
      uTension.x +
      lTension.x +
      uCompensation.x +
      lCompensation.x -
      0.5 * this.dx;
    Fy +=
      uTension.y +
      lTension.y +
      uCompensation.y +
      lCompensation.y -
      0.5 * this.dy;
    let T = (uCompensation.delta ?? 0) + (lCompensation.delta ?? 0);

    const ax = Fx / this.m;
    const ay = Fy / this.m;
    const ao = T / this.inertia;

    this.dx += ax;
    this.dy += ay;
    this.do += ao;

    this.x += this.dx;
    this.y += this.dy;
    this.angle += this.do;
    this.angle = (this.angle + 2 * Math.PI).toFixed(7) % (2 * Math.PI);

    context.globalAlpha = this.energy
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.fillStyle = "#54aeaf4a";
    context.fill();

    const dEnergy = this.energy * this.consumeRate;
    if (this.energy - dEnergy >= 0) {
      this.energy -= this.upperEdge?.feed(this.energy) ? dEnergy : 0;
      this.energy -= this.lowerEdge?.feed(this.energy) ? dEnergy : 0;
    }

    this.upperEdge?.draw(context);
    this.lowerEdge?.draw(context);
  }
}
