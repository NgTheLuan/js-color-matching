import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import { getColorElementList, getColorListElement } from './selectors.js'
import { getRandomColorPairs } from './utils.js'

// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function initColors() {
  // random 8 pair of colors
  const colorList = getRandomColorPairs(PAIRS_COUNT)

  // bind to li > div overlay
  const liList = getColorElementList()
  liList.forEach((liElement, idx) => {
    liElement.dataset.color = colorList[idx] // set data-color in tag li

    const overlayElement = liElement.querySelector('.overlay')
    if (overlayElement) overlayElement.style.backgroundColor = colorList[idx]
  })
}

function attachEventForColorList() {
  const ulElement = getColorListElement()
  if (!ulElement) return

  ulElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return // check add class active only tag li
    handleColorClick(event.target)
  })
}

function handleColorClick(liElement) {
  const shouldBlockClick = [GAME_STATUS.BLOCKING || GAME_STATUS.PLAYING].includes(gameStatus)
  if (!liElement || shouldBlockClick) return
  liElement.classList.add('active')

  // save clicked to selections
  selections.push(liElement)
  if (selections.length < 2) return

  // check match
  const firstColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color
  const isMatch = firstColor === secondColor

  if (isMatch) {
    // check win
    const isWin = getInActiveColorList().length === 0
    if (isWin) {
    }

    // reset selections
    selections = []
    return
  }

  gameStatus = GAME_STATUS.BLOCKING
  // remove active class for li 2 elements
  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')

    gameStatus = GAME_STATUS.PLAYING
  }, 500)
}

// main
;(() => {
  initColors()

  attachEventForColorList()
})()
