const CLOUD_NAME = "dauzn6kas";

const VALID_EVENTS = [
  'Raiders-State-Comp',
  'South-Broward',
  'Yuletide-Parade-25-26',
  'Open-House-25-26',
  'Raider-County',
  'Western-Comp'
];

/**
 * Fetches and groups images from Cloudinary for a specific category.
 */
export const fetchCloudinaryGallery = async (folderName = "jrotc") => {
  try {
    const safeFolder = folderName === "gallery" ? "jrotc" : folderName;
    const categoryTag = safeFolder.toLowerCase().replace(/-/g, '');
    
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${categoryTag}.json?cb=${Date.now()}`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    const grouped = {};

    data.resources.forEach((resource) => {
      const publicId = resource.public_id || "";
      const normalizedPath = publicId.toLowerCase().replace(/[\s_]/g, '-');
      
      let eventMatch = VALID_EVENTS.find(event => 
        normalizedPath.includes(event.toLowerCase())
      );

      const finalGroup = eventMatch || "Recent Uploads";

      if (!grouped[finalGroup]) grouped[finalGroup] = [];

      grouped[finalGroup].push({
        id: publicId,
        title: publicId.split('/').pop().replace(/_/g, ' '),
        url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`,
        width: resource.width,
        height: resource.height
      });
    });

    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      if (a === "Recent Uploads") return 1;
      if (b === "Recent Uploads") return -1;
      return VALID_EVENTS.indexOf(a) - VALID_EVENTS.indexOf(b);
    });

    return sortedKeys.map(key => ({
      name: key.replace(/-/g, ' '),
      photos: grouped[key]
    }));

  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    return [];
  }
};

/**
 * Fetches one "featured_photo" for each main folder to act as a cover on the Home page.
 */
export const getEventPreviews = async () => {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUD_NAME}/image/list/featured_photo.json?cb=${Date.now()}`
    );
    
    if (!response.ok) {
        // Fallback if the tag list is empty or hasn't been enabled in Cloudinary settings
        return [
            { 
              categoryName: "JROTC", 
              path: "/gallery/jrotc", 
              image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/v1/jrotc/featured_photo` 
            }
        ];
    }

    const data = await response.json();

    // This takes the list of images tagged 'featured_photo' and creates the preview objects
    return data.resources.map(res => {
      // Logic: if public_id is "jrotc/event/photo", the category is "jrotc"
      const pathParts = res.public_id.split('/');
      const category = pathParts[0]; 

      return {
        categoryName: category.toUpperCase(),
        path: `/gallery/${category}`,
        image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${res.public_id}`
      };
    });
  } catch (e) {
    console.error("Featured Photos Error:", e);
    return [];
  }
};