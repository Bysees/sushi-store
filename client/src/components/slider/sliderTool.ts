class SliderTool {
  intervalId: number | undefined
  timeInterval = 4_000
  direction: 'left' | 'right' = 'right'

  isStartedMoving = false
  startX = 0
  currentLeft = 0
  minOffset = 0
  maxOffset = 0
  blockWidth = 0
  halfBlockWidth = 0

  sliderWrapperElementWidth: number
  slideElementWidth: number
  sliderElement: HTMLElement

  constructor(
    wrapperWidth: number,
    sliderElement: HTMLElement,
    slideWidth: number
  ) {
    this.sliderWrapperElementWidth = wrapperWidth
    this.slideElementWidth = slideWidth
    this.sliderElement = sliderElement
    this.setListeners()
    this.setInitialDimensions()
    this.startIntervalMoving()
  }

  onMouseUpHandler = (e: MouseEvent) => {
    this.isStartedMoving = false
    this.setBlockRelativeClosestSide()
  }

  onMouseLeaveHandler = (e: MouseEvent) => {
    if (this.isStartedMoving) {
      this.isStartedMoving = false
      this.setBlockRelativeClosestSide()
    }

    this.startIntervalMoving()
  }

  onMouseOverHandler = (e: MouseEvent) => {
    this.sliderElement.style.transition = '0s'
    this.stopIntervalMoving()
  }

  onMouseDownHandler = (e: MouseEvent) => {
    this.isStartedMoving = true
    this.startX = e.pageX - this.sliderElement.offsetLeft
  }

  onMouseMoveHandler = (e: MouseEvent) => {
    const { isStartedMoving } = this

    if (isStartedMoving) {
      let currentLeft = e.pageX - this.startX
      currentLeft = this.checkBorders(currentLeft)

      this.currentLeft = currentLeft

      this.moving(currentLeft)
    }
  }

  checkBorders = (leftBorder: number) => {
    if (leftBorder >= this.minOffset) {
      leftBorder = this.minOffset
    }

    if (leftBorder <= this.maxOffset) {
      leftBorder = this.maxOffset
    }

    return leftBorder
  }

  setBlockRelativeClosestSide = () => {
    const devide = Math.floor(Math.abs(this.currentLeft / this.halfBlockWidth))
    const exactDevide = devide % 2 === 0 ? devide : devide + 1
    const exactLeft = -(exactDevide * this.halfBlockWidth)

    this.sliderElement.style.transition = '0.3s'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.sliderElement.style.transition = '0s'
      })
    })

    this.currentLeft = exactLeft
    this.moving(exactLeft)
  }

  startIntervalMoving = () => {
    let direction = this.direction

    const move = () => {
      let currentLeft = this.currentLeft

      if (currentLeft === this.maxOffset) {
        direction = 'left'
      }

      if (currentLeft === this.minOffset) {
        direction = 'right'
      }

      if (direction === 'right') {
        currentLeft -= this.blockWidth
      }

      if (direction === 'left') {
        currentLeft += this.blockWidth
      }

      this.direction = direction
      this.currentLeft = currentLeft

      this.sliderElement.style.transition = '1s'
      this.moving(currentLeft)

      this.intervalId = window.setTimeout(move, this.timeInterval)
    }

    this.intervalId = window.setTimeout(move, this.timeInterval)
  }

  stopIntervalMoving = () => {
    clearInterval(this.intervalId)
  }

  moving = (x: number) => {
    this.sliderElement.style.left = `${x}px`
  }

  setInitialDimensions = () => {
    this.minOffset = 0
    this.maxOffset = -(
      this.sliderElement.offsetWidth - this.sliderWrapperElementWidth
    )
    this.blockWidth = this.slideElementWidth
    this.halfBlockWidth = this.slideElementWidth / 2
  }

  setListeners = () => {
    if (this.sliderElement) {
      this.sliderElement.onmousedown = this.onMouseDownHandler
      this.sliderElement.onmouseup = this.onMouseUpHandler
      this.sliderElement.onmousemove = this.onMouseMoveHandler
      this.sliderElement.onmouseleave = this.onMouseLeaveHandler
      this.sliderElement.onmouseover = this.onMouseOverHandler
    }
  }

  removeListeners = () => {
    this.sliderElement.onmousedown = null
    this.sliderElement.onmouseup = null
    this.sliderElement.onmousemove = null
    this.sliderElement.onmouseleave = null
    this.sliderElement.onmouseover = null
  }

  unsubscribe = () => {
    this.removeListeners()
    this.stopIntervalMoving()
  }
}

export default SliderTool
