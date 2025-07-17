export const getWeatherBackground = (condition, isNight) => {
  if (!condition) return ''

  const weather = condition.toLowerCase()

  switch (true) {
    case weather.includes('rain'):
      return '/assets/backgrounds/rain.jpg'
    case weather.includes('snow'):
      return '/assets/backgrounds/snow.jpg'
    case weather.includes('cloud'):
      return '/assets/backgrounds/cloudy.jpg'
    case weather.includes('smoke'):
      return '/assets/backgrounds/smoke.jpg'
    case weather.includes('clear'):
      return isNight ? '/assets/backgrounds/night.jpg': '/assets/backgrounds/sunny.jpg'
    default:
      return '/assets/backgrounds/default.jpg'
  }
}
