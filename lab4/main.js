class THashStorage {
    constructor() {
        this._storage = {};
    }

    Reset() {
        this._storage = {};
    }

    AddValue(Key, Value) {
        this._storage[Key] = Value;
    }

    GetValue(Key) {
        return this._storage[Key];
    }

    DeleteValue(Key) {
        return delete this._storage[Key];
    }

    GetKeys() {
        return Object.keys(this._storage);
    }
}
