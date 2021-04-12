export class registery{
  _id?: string;
  title?: string;
  address?: string;
  price?: string;
  note?: string;
  image?: string;//TODO: Add the default Image URL.

  // UI
  isNew?: Boolean = false;
  editable?: Boolean = false;
}
