export class File {
  constructor(data) {
    // The name of the file.
    // For example "index.html", "index.js", "foo.js", "styles.css"
    this.name = data.name;

    // The text file content.
    this.text = data.text;
  }
}
