export class VizHubError {
  constructor({ statusCode, title, message }) {
    // HTTP status code for API requests, e.g. "404", "500" (optional)
    this.statusCode = statusCode;

    //The title to display for the error
    this.title = title;

    //A longer description of the error
    this.message = message;
  }
}
