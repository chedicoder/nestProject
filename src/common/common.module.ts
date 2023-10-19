import { Global, Module } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CommonService } from './common.service';
@Global()
@Module({
  providers: [
    {
      provide: 'UUID',
      useValue: uuidv4,
    },
    CommonService,
  ],
  exports: ['UUID'],
})
export class CommonModule {}
