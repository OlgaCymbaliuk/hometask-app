import { EstablishmentDetail } from "src/app/establishment-detail";

export class Establishment
{
  constructor(
    public id:string,
    public name: string,
    public city: string,
    public postcode: string,
    public address: string,
    public startyear: Date) { };
    
}
