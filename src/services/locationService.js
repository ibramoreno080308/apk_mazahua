import * as Location from 'expo-location';

export async function getAddress(
  latitude,
  longitude,
) {
  try {
    const response =
      await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

    if (response.length > 0) {
      const place = response[0];

      return `${place.street || ''} ${place.streetNumber || ''}, ${place.city || ''}, ${place.region || ''}`;
    }

    return 'Ubicación desconocida';
  } catch {
    return 'Ubicación desconocida';
  }
}