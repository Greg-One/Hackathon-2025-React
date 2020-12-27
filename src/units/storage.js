class Storage {
    constructor(item) {
       this.item = item;
    }

    getItem() {
        const data = localStorage.getItem(this.item);
        return JSON.parse(data);
    }

    setItem(data) {
        localStorage.setItem(this.item, JSON.stringify(data));
    }

    updateItem(data) {
        this.setItem(Object.assign(this.getItem(), data));
    }

    removeItem() {
        localStorage.removeItem(this.item);
    }
}

export default new Storage('data');
