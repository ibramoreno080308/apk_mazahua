export const defaultPlantImage =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800';

export function formatFinding(
  item,
) {
  return {
    id: item.id,
    plantName: item.plantName,
    scientific: item.scientific || 'Sin identificar',
    author: item.author || 'Explorador',
    description: item.description || '',
    uses: item.uses || '',
    location: item.location || 'Ubicación desconocida',
    lat: Number(item.latitude ?? item.lat),
    lng: Number(item.longitude ?? item.lng),
    date: item.date || 'Sin fecha',
    likes: item.likes || 0,
    comments: item.comments || 0,
    verified: Boolean(item.verified),
    rarity: item.rarity || 'Común',
    category: item.category || 'Planta medicinal',
    image: item.image || defaultPlantImage,
  };
}

export function getExplorerLevel(
  contributionCount,
) {
  if (contributionCount >= 50) {
    return 'Sabio Mazahua';
  }

  if (contributionCount >= 25) {
    return 'Herbolario';
  }

  if (contributionCount >= 12) {
    return 'Investigador';
  }

  if (contributionCount >= 3) {
    return 'Explorador';
  }

  return 'Novato';
}
