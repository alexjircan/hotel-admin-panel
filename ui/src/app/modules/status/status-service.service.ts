import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private $api: ApiService) { }

  getTemperature() {
    return this.$api.get("/temp").pipe(
      map( ( result ) => result.temperature)
    );
  }

  public getColor(temp: number): string{
    let r = 255;
    let g = 255;
    let b = 255;

    if( temp < 12 ){
      r=0;g=0;b=255;
    }
    else if( temp>=12 && temp<=16 ){
      r=0;g=200;b=255;
    }
    else if( temp>16 && temp<20 ){
      r=0;g=255;b=85;
    }
    else if( temp>=20 && temp<=22 ){
      r=0;g=255;b=0;
    }
    else{
      r=255;g=0;b=0;
    }

    return "color: rgb("+r+","+g+","+b+")";
  }
}
