// Centralized search data for autocomplete
// This includes destinations, businesses, and resorts from the website

export interface SearchResult {
  id: string | number;
  type: "destination" | "business" | "resort";
  name: string;
  location: string;
  category?: string;
  path: string;
}

// Destinations data
const destinations: SearchResult[] = [
  {
    id: 1,
    type: "destination",
    name: "Biri Island Rock Formations",
    location: "Biri, Northern Samar",
    category: "Islands",
    path: "/destinations/1",
  },
  {
    id: 2,
    type: "destination",
    name: "Bangon Falls",
    location: "Calbayog City",
    category: "Waterfalls",
    path: "/destinations/2",
  },
  {
    id: 3,
    type: "destination",
    name: "Sohoton Natural Bridge",
    location: "Basey, Samar",
    category: "Caves",
    path: "/destinations/3",
  },
  {
    id: 4,
    type: "destination",
    name: "Lobo Beach",
    location: "Calbayog City",
    category: "Beaches",
    path: "/destinations/4",
  },
  {
    id: 5,
    type: "destination",
    name: "Torpedo Falls",
    location: "San Jorge, Samar",
    category: "Waterfalls",
    path: "/destinations/5",
  },
  {
    id: 6,
    type: "destination",
    name: "Calbayog Zip Line",
    location: "Calbayog City",
    category: "Historical",
    path: "/destinations/6",
  },
];

// Businesses/Resorts data
const businesses: SearchResult[] = [
  {
    id: 1,
    type: "business",
    name: "Island Hopping Adventures",
    location: "Catbalogan City",
    category: "Tours",
    path: "/businesses",
  },
  {
    id: 2,
    type: "resort",
    name: "Samar Beach Resort",
    location: "Calbayog City",
    category: "Accommodations",
    path: "/businesses",
  },
  {
    id: 4,
    type: "business",
    name: "Kuya Rey's Motorcycle Rental",
    location: "Catbalogan City",
    category: "Rentals",
    path: "/businesses",
  },
  {
    id: 5,
    type: "business",
    name: "Seaside Grill & Restaurant",
    location: "Calbayog City",
    category: "Restaurants",
    path: "/businesses",
  },
  {
    id: 6,
    type: "business",
    name: "Sohoton Cave Tours",
    location: "Basey, Samar",
    category: "Tours",
    path: "/businesses",
  },
];

// Combine all searchable items
export const allSearchItems: SearchResult[] = [...destinations, ...businesses];

// Search function
export const searchItems = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return allSearchItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(lowerQuery) ||
      item.location.toLowerCase().includes(lowerQuery) ||
      item.category?.toLowerCase().includes(lowerQuery)
    );
  }).slice(0, 8); // Limit to 8 results
};

