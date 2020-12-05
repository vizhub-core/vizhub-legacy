export class DatabaseEventRecordsGateway {
  constructor(database) {
    this.database = database;
  }

  async getEventRecords(eventIDs) {
    return await this.database.getEventRecords(eventIDs);
  }

  async setEventRecords(newRecords) {
    return await this.database.setEventRecords(eventIDs);
  }
}
