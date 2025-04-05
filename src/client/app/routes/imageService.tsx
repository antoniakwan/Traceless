// interfaces.ts (or you can include these in your imageService.ts file)
interface WatermarkResponse {
    status: string;
    watermarked_image: string;
  }
  
  // imageService.ts
  export class ImageService {
    private baseUrl: string = 'http://127.0.0.1:5000'; // Update this to match your Flask server URL
    
    /**
     * Upload an image and add watermark
     * @param file The image file to watermark
     * @param watermarkText Text to add as watermark
     * @returns Promise with the URL to the watermarked image
     */
    async addWatermark(file: File, watermarkText: string): Promise<string> {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('watermark_text', watermarkText);
        
        const response = await fetch(`${this.baseUrl}/watermark`, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: WatermarkResponse = await response.json();
        
        // Return the full URL to the watermarked image
        return `${this.baseUrl}${data.watermarked_image}`;
      } catch (error) {
        console.error('Error adding watermark to image:', error);
        throw error;
      }
    }
  }