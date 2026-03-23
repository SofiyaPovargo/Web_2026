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

class TLocalStorage extends THashStorage {
    constructor(storageKey = "TLocalStorage_default") {
        super();
        this._storageKey = storageKey;
        this._loadFromLocal();
    }

    _loadFromLocal() {
        try {
            const raw = window.localStorage.getItem(this._storageKey);
            this._storage = raw ? JSON.parse(raw) : {};
        } catch {
            this._storage = {};
        }
    }

    _persist() {
        window.localStorage.setItem(
            this._storageKey,
            JSON.stringify(this._storage)
        );
    }

    Reset() {
        super.Reset();
        this._persist();
    }

    AddValue(Key, Value) {
        super.AddValue(Key, Value);
        this._persist();
    }

    DeleteValue(Key) {
        const removed = super.DeleteValue(Key);
        this._persist();
        return removed;
    }
}
