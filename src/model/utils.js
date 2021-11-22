export function getLegendSection(value, breakpoints) {
  for (let i = 1; i < breakpoints.length; i++) {
    if (value <= breakpoints[i]) {
      return i
    }
  }
  return breakpoints.length
}
