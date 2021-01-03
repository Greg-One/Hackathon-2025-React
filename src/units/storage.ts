import { IData } from '../interfaces';

class Storage {
  private readonly item: string;

  constructor(item: string) {
    this.item = item;
  }

  public getItem() {
    return JSON.parse(localStorage.getItem(this.item) || '[]') as IData;
  }

  public setItem(data: IData) {
    localStorage.setItem(this.item, JSON.stringify(data));
  }

  public updateItem(data: IData) {
    this.setItem(Object.assign(this.getItem(), data));
  }

  public removeItem() {
    localStorage.removeItem(this.item);
  }
}

export default new Storage('data');
