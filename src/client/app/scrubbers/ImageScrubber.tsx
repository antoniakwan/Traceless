import piexif from 'piexifjs';

export class ImageScrubber {
    /**
   * Strips all EXIF metadata from a JPEG image.
   * @param file - The JPEG file
   * @returns A Blob of the cleaned image
   */
  static async strip(file: File): Promise<Blob> {
    console.log("Stripping input file")
    const base64 = await this.readFileAsDataURL(file);

    const cleanBase64 = piexif.remove(base64);

    return this.dataURLToBlob(cleanBase64);
  }

  private static readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject
      reader.readAsDataURL(file);
    });
  }

  private static dataURLToBlob(dataURL: string): Blob {
    const [meta, base64] = dataURL.split(",");
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    const mime = meta.match(/:(.*?);/)?.[1] || "image/jpeg";
    return new Blob([array], { type: mime });
  }
}
