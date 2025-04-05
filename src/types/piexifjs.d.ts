declare module 'piexifjs' {
    const piexif: {
      remove: (jpegDataURL: string) => string;
      load: (jpegDataURL: string) => any;
      insert: (jpegDataURL: string, exifData: string) => string;
    };
    export default piexif;
  }