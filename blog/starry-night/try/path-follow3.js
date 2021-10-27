window.onload = function () {
  let pathObj = null,
    canvasObj = null,
    mover = null,
    requestAnimationFrameMark = null;
  class Path {
    constructor() {
      this.radius = 5; // 路径的范围
      this.points = [];
      this.init();
    }

    init() {
      let a = 0,
        b = 10,
        angle = 0;
      let points = [],
        x = 0,
        y = 0;
      const acceleration = 0.5,
        circleNum = 2;
      // 注意这里角度的递增，以 2 * Math.PI 为基准进行比较，控制画多少圈
      while (angle <= circleNum * 2 * Math.PI) {
        x = (a + b * angle) * Math.cos(angle);
        y = (a + b * angle) * Math.sin(angle);
        this.points.unshift(new Vector(x + 150, y + 150));
        angle = MathLab.plus(angle, acceleration);
      }
    }

    getStart() {
      return this.points[0];
    }

    getEnd() {
      return this.points[this.points.length - 1];
    }

    // Draw the path
    display = (canvas) => {
      const { points } = this;
      const { line, clear, resetTransform } = canvas;
      let validPoints = points.filter((ele, index) => {
        return index < 3;
      });
      console.info("validPoints", validPoints);
      const linePoints = validPoints.map((ele) => {
        return [ele.x, ele.y];
      });
      line({ points: linePoints });
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

      // Now we must find the normal to the path from the predicted location
      // We look at the normal for each line segment and pick out the closest one

      let normal = null;
      let target = null;
      let worldRecord = 1000000; // Start with a very high record distance that can easily be beaten
      // 所有线段路径
      for (let i = 0; i < p.points.length - 1; i++) {
        // Look at a line segment
        let a = p.points[i];
        let b = p.points[i + 1];
        //println(b);

        // Get the normal point to that line
        let normalPoint = getNormalPoint(predictLoc, a, b);
        // This only works because we know our path goes from left to right
        // We could have a more sophisticated test to tell if the point is in the line segment or not
        if (normalPoint.x < a.x || normalPoint.x > b.x) {
          // This is something of a hacky solution, but if it's not within the line segment
          // consider the normal to just be the end of the line segment (point b)
          normalPoint = b.copy();
        }

        // How far away are we from the path?
        let distance = Vector.dist(predictLoc, normalPoint);
        // Did we beat the record and find the closest line segment?
        if (distance < worldRecord) {
          worldRecord = distance;
          // If so the target we want to steer towards is the normal
          normal = normalPoint;

          // Look at the direction of the line segment so we can seek a little bit ahead of the normal
          let dir = Vector.sub(b, a);
          dir.normalize();
          // This is an oversimplification
          // Should be based on distance to path & velocity
          dir.mult(10);
          target = normalPoint.copy();
          target.add(dir);
        }
      }

      // Only if the distance is greater than the path's radius do we bother to steer
      if (worldRecord > p.radius && target !== null) {
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
      if (this.position.x > p.getEnd().x + this.r) {
        this.position.x = p.getStart().x - this.r;
        this.position.y = p.getStart().y + (this.position.y - p.getEnd().y);
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
    pathObj.display(canvasObj);
    mover = new Vehicle(0, 300 / 2, 2, 0.1);
    pageEvent();
    // requestAnimationFrame(draw);
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
