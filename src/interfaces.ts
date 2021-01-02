interface ITag {
  id: number,
  name: string,
  keywords: Array<string>,
}

interface ICategory {
  id: number,
  name: string,
  tags: ITag[],
}

interface IOrder {
  email: string
}

interface IData {
  category?: number,
  tag?: number,
  currentPoemNum?: number,
  poem?: string,
  transform?: boolean,
}

interface IPoem {
  fields: {
    text: string
  }
}

export type {
  IData,
  IOrder,
  ITag,
  ICategory,
  IPoem,
};
