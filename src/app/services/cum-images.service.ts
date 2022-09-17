import { Injectable, Injector } from '@angular/core';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class CumImagesService extends BaseService {

  constructor(injector: Injector) {
    super(Constant.Endpoints.CUM_IMAGES.BASE, injector);
  }
}
