import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ TodoModule,CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '21081999',
      database: 'myNestProject',
      synchronize: false, // Cela synchronisera automatiquement votre schéma de base de données avec vos entités. Ne l'utilisez pas en production.
      autoLoadEntities: true,
      logging: true,})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
