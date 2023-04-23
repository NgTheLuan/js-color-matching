function shuffle(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return arr

  for (let i = arr.length - 1; arr > 1; i--) {
    const j = Math.floor(Math.random() * i) // create num < i

    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor

  const colorList = []
  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']

  // random "count" colors
  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hueList[i % hueList.length], // check when count > 8
    })

    colorList.push(color)
  }

  // double colorList and shuffle
  const fullColorList = [...colorList, ...colorList]
  shuffle(fullColorList)

  return colorList
}
