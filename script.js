const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

const mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 40,
    minRadius = 5

const colorArray = [
     '#ffaa33',
     '#99ffaa',
     '#00ff00',
     '#4411aa',
     '#ff1100'
]

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx
        this.y += this.dy

        if (mouse.x - this.x < 50
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1
            }

        } else if (this.radius > minRadius) {
            this.radius -= 1
        }

        this.draw()
    }
}

const circleArray = []

for (let i = 0; i < 200; i++) {
    const radius = 30
    const x = Math.random() * (innerWidth - (radius * 2)) + radius
    const y = Math.random() * (innerHeight - (radius * 2)) + radius
    const dx = (Math.random() - 0.5)
    const dy = (Math.random() - 0.5)

    circleArray.push(new Circle(x, y, dx, dy, radius))
}

var circle = new Circle(200, 100, 3, 3, 50)

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}

animate()