import Piexif from 'piexifjs';

/**
* Strips all EXIF metadata from a JPEG image.
* @param file - The JPEG file
* @returns A Blob of the cleaned image
*/
export const strip = async (file : File) : Promise<Blob> =>
  dataURLToBlob(Piexif.remove(await readFileAsDataURL(file)))

export const edit = async (file: File, artist: String, make: String, model: String, latitude: number, longitude: number, dateTime: Date, timeZone: number) : Promise<Blob> =>
  dataURLToBlob(await editData(file, artist, make, model, latitude, longitude, dateTime, timeZone))

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

/**
 * Edit EXIF data for an image.
 * @param file - The File object (image) to edit EXIF data
 * @param artist - New artist name
 * @param make - Camera make
 * @param model - Camera model
 * @param latitude - GPS latitude
 * @param longitude - GPS longitude
 * @param dateTime - Date and time of the photo (should be a Date object)
 * @param timeZone - Time zone offset in minutes (e.g., -300 for UTC-5)
 * @returns A promise resolving to the image with edited EXIF data
 */
const editData = async (file: File, artist: String, make: String, model: String, latitude: number, longitude: number, dateTime: Date, timeZone: number) : Promise<string> => {
  try {
    const dataUrl = await readFileAsDataURL(file);

    const exif_dict = Piexif.load(dataUrl);
    console.log("EXIF Data:", exif_dict);

    if (exif_dict["0th"]) {
      console.log("Artist:", exif_dict["0th"][Piexif.ImageIFD.Artist]);

      // edit artist
      exif_dict["0th"][Piexif.ImageIFD.Artist] = artist;

      // edit make and model
      exif_dict["0th"][Piexif.ImageIFD.Make] = make;
      exif_dict["0th"][Piexif.ImageIFD.Model] = model;
    }

    if (exif_dict["Exif"]) {
      // edit DateTime
      const dateStr = formatDateTime(dateTime, timeZone);
      exif_dict["Exif"][Piexif.ExifIFD.DateTimeOriginal] = dateStr;
    }

    if (exif_dict["GPS"]) {
      // edit gps data (latitude, longitude)
      exif_dict["GPS"][Piexif.GPSIFD.GPSLatitude] = [1, 2, 3];
      exif_dict["GPS"][Piexif.GPSIFD.GPSLongitude] = convertToDMS(longitude);

      console.log("GPS lat after:", exif_dict["GPS"][Piexif.GPSIFD.GPSLatitude])
      console.log("GPS lat before:", latitude)
    }

    return Piexif.insert(Piexif.dump(exif_dict), dataUrl)
    
  } catch (error) {
    console.error("Failed to load EXIF Data:", error);
    return ""
  }
}

const formatDateTime = (date: Date, timeZone: number): string => {
  const offset = timeZone || new Date().getTimezoneOffset(); // Time zone offset in minutes
  date.setMinutes(date.getMinutes() - offset); // Adjust DateTime for time zone

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
};

// function decimalToDMS(decimalDegree: number): string {
//   const degrees = Math.floor(decimalDegree);
//   const minutes = Math.floor((decimalDegree - degrees) * 60);
//   const seconds = Math.round(((decimalDegree - degrees - minutes / 60) * 3600));


const convertToDMS = (coordinate: number): any[] => {
  const degrees = Math.floor(coordinate);
  const minutes = Math.floor((coordinate - degrees) * 60);
  const seconds = ((coordinate - degrees - minutes / 60) * 3600).toFixed(2);

  return [degrees, minutes, parseFloat(seconds)];
  // const degrees = Math.floor(coordinate);
  // const minutes = Math.floor((coordinate - degrees) * 60);
  // const seconds = ((coordinate - degrees) * 60 - minutes) * 60;
  
  //return [degrees, minutes, seconds];
};


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