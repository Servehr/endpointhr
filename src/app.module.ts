/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './mail/email.module';
import { DashboardController } from './modules/dashboard/dashboard.controller';
import { ChangeController } from './modules/change/change.controller';
import { ChangeService } from './modules/change/change.service';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { ChangeModule } from './modules/change/change.module';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileService } from './modules/profile/profile.service';
import { ProfileModule } from './modules/profile/profile.module';
import { AcademicModule } from './modules/profile/academic/academic.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL_Local),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10, }]),
    ChangeModule,
    ProfileModule,
    AcademicModule
  ],
  controllers: [DashboardController, ChangeController, ProfileController],
  providers: [ChangeService, DashboardService, ProfileService, 
              {
                provide: APP_GUARD,
                useClass: ThrottlerGuard
              }
            ],
})
export class AppModule {
   constructor(){ console.log('Connection Established') }
}
