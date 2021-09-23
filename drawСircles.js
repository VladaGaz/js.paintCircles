class DrawСircles {

   constructor() {
      this.isMouseDown = false
      this.defaultCoordinates()
      this.attachEvents()
   }

   defaultCoordinates = () => {
      this.coordinates = {
         x: [],
         y: [],
      }
   }

   incorrectCircle = (event) => {
      if (!this.isMouseDown) {
         return
      }

      // создаем div, который будет рисовать круг
      const div = document.createElement('div')
      div.className = 'point'
      document.body.append(div)

      // координаты мыши
      const x = event.pageX
      const y = event.pageY

      // заносим координаты в массив
      this.coordinates.x.push(event.pageX)
      this.coordinates.y.push(event.pageY)

      // задаём координаты div
      div.style.left = x + 'px'
      div.style.top = y + 'px'
   }

   correctCircle = () => {
      this.isMouseDown = false

      // получаем макс и мин значения координат кривого круга
      const minX = Math.min.apply(null, this.coordinates.x)

      const maxY = Math.max.apply(null, this.coordinates.y)
      const minY = Math.min.apply(null, this.coordinates.y)

      // получаем диаметр правильного круга
      const diameter = maxY - minY

      // удаляем прошлые div
      document.querySelectorAll('.point').forEach(node => {
         node.remove()
      })

      // нужно вставить правильный круг по координатам
      const div = document.createElement('div')
      div.className = 'circle'
      document.body.append(div)

      // добавляем стиль правильному кругу
      div.style.left = minX + 'px'
      div.style.top = minY + 'px'

      div.style.width = diameter + 'px'
      div.style.height = diameter + 'px'

      // очищаем массивы координат
      this.defaultCoordinates()
   }

   attachEvents = () => {
      document.body.addEventListener('mousedown', () => this.isMouseDown = true)
      document.body.addEventListener('mousemove', this.incorrectCircle)
      document.body.addEventListener('mouseup', this.correctCircle)
   }
}

new DrawСircles()