import Piexif from 'piexifjs';

/**
* Strips all EXIF metadata from a JPEG image.
* @param file - The JPEG file
* @returns A Blob of the cleaned image
*/
// export const strip = async (file : File) : Promise<Blob> =>
//   dataURLToBlob(remove(await readFileAsDataURL(file)))

export const strip = async (file : File) : Promise<Blob> =>
  dataURLToBlob(await loadExifData(file))

// export const strip = async (file : File) : Promise<Blob> => {
//   const r = new FileReader()
//   r.onloadend = e => {
//     Piexif.load(e.target?.result)
//   }
// }



// export const customize = async (file: File) : Promise<Blob> => {
  
// }

const readFileAsDataURL = (file : File) : Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject
  reader.readAsDataURL(file);
})

const dataURLToBlob = (dataURL : string) : Blob => {
  const [meta, base64] = dataURL.split(",")
  try {
    const binary = atob(base64)
    const array = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++)
      array[i] = binary.charCodeAt(i) 
    const mime = meta.match(/:(.*?);/)?.[1] || "image/jpeg"
  return new Blob([array], { type: mime })
  } catch (err) {
    console.error("Failed to decode base64 image:", err);
    console.log("Raw base64 (start):", base64.slice(0,100));
    throw err;
  }
};

const loadExifData = async (file: File) : Promise<string> => {
  try {
    const dataUrl = await readFileAsDataURL(file);

    const exif_dict = Piexif.load(dataUrl);
    console.log("EXIF Data:", exif_dict);

    if (exif_dict["0th"]) {
      console.log("Artist:", exif_dict["0th"][Piexif.ImageIFD.Artist]);
      exif_dict["0th"][Piexif.ImageIFD.Artist] = "Mark Pock"
    }

    return Piexif.insert(Piexif.dump(exif_dict), dataUrl)
    
  } catch (error) {
    console.error("Failed to load EXIF Data:", error);
    return ""
  }
}

const loadData = async (
  file : File,
  // exifTag : number
) : Promise<string> => {
  // const url = URL.createObjectURL(file)
  // console.log(url)
  // const exif_dict = Piexif.load(url)
  // URL.revokeObjectURL(url)
  const dataUrl = await readFileAsDataURL(file);
  console.log("Data URL starts with:", dataUrl.slice(0, 30));
  const exif_dict = Piexif.load(dataUrl);
  let x = exif_dict["0th"]
  if (x === undefined) throw "Exif dictionary undefined."
  // x[Piexif.ImageIFD.Artist] = "Mark Pock"
  return Piexif.dump(exif_dict)
}