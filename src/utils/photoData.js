// Updated for Vite v6+ requirements
const imageModules = import.meta.glob('/public/images/**/*.{JPG,jpg,jpeg}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

export const PHOTO_DATA = Object.keys(imageModules).map((path, index) => {
  // Fix: Vite serves public folder from root, so we strip '/public'
  const url = path.replace('/public', '');
  const lowerPath = path.toLowerCase();
  
  let category = 'social events'; 
  if (lowerPath.includes('broward') || lowerPath.includes('raider') || lowerPath.includes('jrotc')) {
    category = 'jrotc';
  } else if (lowerPath.includes('sport')) {
    category = 'sports';
  } else if (lowerPath.includes('landscape')) {
    category = 'landscape';
  }

  return { 
    id: index, 
    url: url, 
    category: category, 
    title: path.split('/').pop() 
  };
});

export const getEventPreviews = () => {
  const categories = ['jrotc', 'sports', 'social events', 'landscape'];
  return categories.map(cat => ({
    categoryName: cat,
    photos: PHOTO_DATA.filter(p => p.category === cat).slice(0, 2)
  })).filter(event => event.photos.length > 0);
};