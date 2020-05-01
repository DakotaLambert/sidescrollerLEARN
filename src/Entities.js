class Entity {
  constructor(initial) {
    this.height = initial.height;
    this.width = initial.width;
    this.jumping = initial.jumping;
    this.x = initial.x;
    this.xV = initial.xV;
    this.y = initial.y;
    this.yV = initial.yV;
  }

  render = (ctx, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fill();
  }
}

export default Entity;
