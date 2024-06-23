export interface IHotel {
  id: number ;
  hotelName: string | null;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  rating: number | null;
  tags?: string[]
}

export class Hotel implements IHotel{
  constructor(
    public id:number,
    public hotelName:string,
    public description:string,
    public price:number,
    public imageUrl:string,
    public rating:number,
    public tags:string[]
  ) {
  }
}
