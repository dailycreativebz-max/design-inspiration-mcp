import fs from "fs/promises";
import path from "path";

let designMdDir = path.join(process.cwd(), "design-md");

/**
 * Sets the directory path for design-md files.
 */
export function setDesignMdDir(dirPath) {
  designMdDir = dirPath;
}

/**
 * Lists all brands available in the design-md directory.
 */
export async function listDesignMdBrands() {
  try {
    const entries = await fs.readdir(designMdDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    console.error(`Error listing design-md brands in ${designMdDir}:`, error);
    return [];
  }
}

/**
 * Gets the content of a DESIGN.md file for a specific brand.
 */
export async function getDesignMd(brand) {
  try {
    const brandDir = path.join(designMdDir, brand);
    const designMdPath = path.join(brandDir, "DESIGN.md");
    const content = await fs.readFile(designMdPath, "utf-8");
    
    return {
      brand,
      content,
      path: designMdPath,
      fetched_at: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error reading DESIGN.md for brand ${brand} in ${designMdDir}:`, error);
    return null;
  }
}

/**
 * Search for brands or content within DESIGN.md files.
 */
export async function searchBrandDesigns(query) {
  const brands = await listDesignMdBrands();
  const results = [];
  
  const normalizedQuery = query.toLowerCase();
  
  for (const brand of brands) {
    if (brand.toLowerCase().includes(normalizedQuery)) {
      results.push({ brand, match_type: "brand_name" });
      continue;
    }
  }
  
  return results;
}
