import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/models/profile.schema';

import { ProfileService } from './../profile.service';
import { AcademicController } from './academic.controller';
import { AcademicService } from './academic.service';
import { ProfileController } from './../profile.controller';
import { AuthService } from 'src/auth/auth.service';
import { AcademicSchema } from 'src/models/academic.schema';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        AuthModule, PassportModule,
        MongooseModule.forFeature([{ name: 'Academic', schema: AcademicSchema }]),
    ],
    controllers: [AcademicController],
    providers: [AcademicService],
    exports: []
})
export class AcademicModule {}
