export class File {

  // The name of the file.
  // For example "index.html", "index.js", "foo.js", "styles.css"
  name: string;

  // The text file content.
  text: string;
  
  constructor (data) {
    this.name = data.name;
    this.text = data.text;
  }
}
