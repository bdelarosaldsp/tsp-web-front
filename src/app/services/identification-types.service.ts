import { Injectable, Injector } from '@angular/core';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypesService extends BaseService{

  constructor(injector: Injector) {
    super(Constant.Endpoints.IDENTIFICATION_TYPES.BASE, injector);
  }
}
