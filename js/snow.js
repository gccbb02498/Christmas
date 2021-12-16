function snowFall(snow) {
    snow = snow || {}
    this.maxFlake = snow.maxFlake || 200
    this.flakeSize = snow.flakeSize || 10
    this.fallSpeed = snow.fallSpeed || 1
}
snowFall.prototype.start = function () {
    snowCanvas.apply(this)
    createFlakes.apply(this)
    drawSnow.apply(this)
}

function snowCanvas() {
    var snowCanvas = document.createElement('canvas')
    snowCanvas.id = "snowfall"
    snowCanvas.width = document.body.offsetWidth
    snowCanvas.height = window.innerHeight
    
    document.getElementsByClassName("block")[0].append(snowCanvas)
    this.canvas = snowCanvas
    this.ctx = snowCanvas.getContext('2d')
    window.onresize = function () {
        snowCanvas.width = document.body.offsetWidth
        snowCanvas.height = window.innerHeight
    }
}
function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
    this.x = Math.floor(Math.random() * canvasWidth)
    this.y = Math.floor(Math.random() * canvasHeight)
    this.size = Math.random() * flakeSize + 2
    this.maxSize = flakeSize
    this.speed = Math.random() * 1 + fallSpeed
    this.fallSpeed = fallSpeed
    this.velY = this.speed
    this.velX = 0
    this.stepSize = Math.random() / 30
    this.step = 0
}

flakeMove.prototype.update = function () {
    var x = this.x
    var y = this.y

    this.velX *= 0.98
    if (this.velY <= this.speed) {
        this.velY = this.speed
    }
    this.velX += Math.cos(this.step += .05) * this.stepSize

    this.y += this.velY
    this.x += this.velX

    if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
        this.reset(canvas.width, canvas.height)
    }
}

flakeMove.prototype.reset = function (width, height) {
    this.x = Math.floor(Math.random() * width)
    this.y = 0
    this.size = Math.random() * this.maxSize + 2
    this.speed = Math.random() * 1 + this.fallSpeed
    this.velY = this.speed
    this.velX = 0
}

flakeMove.prototype.render = function (ctx) {
    var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
    snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");  /* 此处是雪花颜色，默认是白色 */
    snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)"); /* 若要改为其他颜色，请自行查 */
    snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");    /* 找16进制的RGB 颜色代码。 */

    ctx.save()
    ctx.fillStyle = snowFlake
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fill()
    ctx.restore()
}

function createFlakes() {
    var maxFlakes = this.maxFlake,
        flakes = this.flakes = [],
        canvas = this.canvas
    for (var i = 0; i < maxFlakes; i++) {
        flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
    }
}
function drawSnow() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes
    ctx = this.ctx, canvas = this.canvas, that = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    flakes.forEach(item => {
        item.update()
        item.render(ctx)
    });

    this.loop = requestAnimationFrame(function () {
        drawSnow.apply(that)
    })

}
var snow = new snowFall({ maxFlake: 200 })
snow.start()