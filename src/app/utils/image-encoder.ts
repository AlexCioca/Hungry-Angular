export class ImageEncode{

  static fileToByteArray(file:any) {
    return new Promise((resolve, reject) => {
      try {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (evt) => {
          resolve(reader.result);
        };
      } catch (e) {
        reject(e);
      }
    });
  }
}
