class DataAccess {
    constructor(db) {
        console.log(db);
        this.db = db;
        this.collectionName = 'regions';
        this.collection = this.db.collection(this.collectionName);
    }

    getRegions() {
        return this.collection.find().toArray();
    }
}

module.exports = DataAccess;
