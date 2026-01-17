import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchMetadata = async (url: string) => {
  try {
    // Using microlink.io free tier for demo purposes to fetch metadata
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        title: data.data.title || '',
        description: data.data.description || '',
        image: data.data.image?.url || '',
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
};
