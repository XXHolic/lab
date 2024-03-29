window.onload = function () {
  let pathObj = null,
    canvasObj = null,
    mover = null,
    requestAnimationFrameMark = null;
  class Path {
    constructor(points) {
      this.radius = 5; // 路径的范围
      this.start = new Vector(0, 30); // 路径的起点
      this.end = new Vector(600, 200); // 路径的终点
      this.points = points || [
        [0, 30],
        [600, 200],
      ];
    }

    // Draw the path
    display = (canvas) => {
      const { points } = this;
      const { line, clear, resetTransform } = canvas;
      line({ points });
    };
  }

  class Vehicle {
    constructor(x, y, ms, mf) {
      this.position = new Vector(x, y);
      this.acceleration = new Vector(0, 0);
      this.velocity = new Vector(2, 0); // 速度
      this.r = 4;
      this.maxspeed = ms || 4;
      this.maxforce = mf || 0.1;
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
      this.display(canvas);
    }

    // This function implements Craig Reynolds' path following algorithm
    // http://www.red3d.com/cwr/steer/PathFollow.html
    follow(p) {
      // 预测过一段时间出现的位置
      let predict = this.velocity.copy();
      predict.normalize(); // 获取单位向量
      predict.mult(50); // 预测 50 像素
      let predictLoc = Vector.add(this.position, predict);

      // Look at the line segment
      let a = p.start;
      let b = p.end;

      // 找到预测点到路径最近的一个点
      let normalPoint = getNormalPoint(predictLoc, a, b);

      // Find target point a little further ahead of normal
      // 给了一个目标点，这个是为了能一直移动，总是比目标点提前一些
      let dir = Vector.sub(b, a);
      dir.normalize();
      dir.mult(10); // This could be based on velocity instead of just an arbitrary 10 pixels
      let target = Vector.add(normalPoint, dir);

      // How far away are we from the path?
      // 找到预测点和到路径最近点的距离，跟控制范围做比较
      let distance = Vector.dist(predictLoc, normalPoint);
      // Only if the distance is greater than the path's radius do we bother to steer
      if (distance > p.radius) {
        this.seek(target);
      }
    }

    applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
      // 目前位置跟目标位置的向量
      let desired = Vector.sub(target, this.position); // A vector pointing from the position to the target

      // If the magnitude of desired equals 0, skip out of here
      // (We could optimize this to check if x and y are 0 to avoid mag() square root
      // 通过向量长度判断是否到了目标点
      if (desired.mag() === 0) return;

      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus Velocity
      let steer = Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force

      this.applyForce(steer);
    }

    // Method to update position
    update() {
      // Update velocity 更新速度，相当于更新移动的位置
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelerationelertion to 0 each cycle
      this.acceleration.mult(0);
    }

    // Wraparound
    borders(p) {
      if (this.position.x > p.end.x + this.r) {
        this.position.x = p.start.x - this.r;
        this.position.y = p.start.y + (this.position.y - p.end.y);
      }
    }

    display = (canvas) => {
      // Draw a triangle rotated in the direction of velocity
      const { translate, rotate, arc, resetTransform } = canvas;

      // let theta = this.velocity.heading() + Math.PI / 2;

      translate(this.position.x, this.position.y);
      // rotate(theta);
      arc(this.circleAttrs);
      resetTransform();
    };
  }

  // A function to get the normal point from a point (p) to a line segment (a-b)
  // This function could be optimized to make fewer new Vector objects
  function getNormalPoint(p, a, b) {
    // Vector from a to p
    let ap = Vector.sub(p, a);
    // Vector from a to b
    let ab = Vector.sub(b, a);
    ab.normalize(); // Normalize the line
    // Project vector "diff" onto line by using the dot product
    ab.mult(ap.dot(ab));
    let normalPoint = Vector.add(a, ab);
    return normalPoint;
  }

  function pageEvent() {
    document.querySelector("#stop").onclick = () => {
      window.cancelAnimationFrame(requestAnimationFrameMark);
    };
    document.querySelector("#start").onclick = () => {
      requestAnimationFrameMark = requestAnimationFrame(draw);
    };
  }

  function pageInit() {
    canvasObj = new Canvas(600, 300);
    canvasObj.attrs({ class: "flow-canvas" });
    document.querySelector("#demo").appendChild(canvasObj.node);
    pathObj = new Path();
    // pathObj.display(canvasObj);
    mover = new Vehicle(0, 300 / 2, 2, 0.02);
    pageEvent();
    requestAnimationFrame(draw);
  }

  function draw() {
    canvasObj && canvasObj.clear();
    pathObj.display(canvasObj);
    mover.follow(pathObj);
    mover.run(canvasObj);
    mover.borders(pathObj);
    requestAnimationFrameMark = requestAnimationFrame(draw);
  }

  pageInit();

};
