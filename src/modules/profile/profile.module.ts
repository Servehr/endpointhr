import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileSchema } from 'src/models/profile.schema';
import { ProfileController } from './profile.controller';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { ProfileService } from './profile.service';
import { ValidatueUserMiddleware } from 'src/common/middlewares/validate.user.middleware';

@Module({
    imports: [
        AuthModule, PassportModule,
        MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }])
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: []
})
export class ProfileModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidatueUserMiddleware)
                .exclude('api/employee/create')
                .forRoutes(ProfileController)
    }
}
