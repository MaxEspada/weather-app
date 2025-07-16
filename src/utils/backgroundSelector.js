export const getWeatherBackground = (condition) => {
  if (!condition) return ''

  const weather = condition.toLowerCase()

  switch (true) {
    case weather.includes('cloud'):
      return '/assets/backgrounds/cloudy.jpg';
    case weather.includes('rain'):
      return '/assets/backgrounds/rain.jpg';
    case weather.includes('snow'):
      return '/assets/backgrounds/snow.jpg';
    case weather.includes('night') || weather.includes('clear'):
      return '/assets/backgrounds/night.jpg';
    case weather.includes('smoke'):
      return '/assets/backgrounds/smoke.jpg';
    default:
      return '';
  }
}
