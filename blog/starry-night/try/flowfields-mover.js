class Mover {
  constructor(x, y, ms, mf) {
    this.position = new Vector(x, y);
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.r = 4;
    this.maxspeed = ms || 4; // 最大速度
    this.maxforce = mf || 0.1; //
    this.circleAttrs = {
      x: this.r / 2,
      y: this.r / 2,
      radius: this.r,
      startAngle: 0,
      endAngle: Math.PI * 2,
      strokeStyle: "#e11818",
      fillStyle: "#e11818",
    };
  }

  run(canvas) {
    this.update();
    this.borders();
    this.display(canvas);
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  follow = (flow) => {
    // What is the vector at that spot in the flow field?
    let desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    let steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  };

  applyForce = (force) => {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  };

  // Method to update location
  update = () => {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  };

  borders = () => {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  };

  display = (canvas) => {
    // Draw a triangle rotated in the direction of velocity
    const { translate, rotate, line, arc, resetTransform } = canvas;
    let theta = this.velocity.heading();
    translate(this.position.x, this.position.y);
    rotate(theta);
    arc(this.circleAttrs);
    resetTransform();
  };
}
