import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { HotelroomsModule } from './modules/hotelrooms/hotelrooms.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { SocketModule } from './modules/socket/socket.module';
import { SupportModule } from './modules/chat/support.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    // MongooseModule.forRoot("mongodb+srv://akorotaev75_db_user:U0zT1Iv34XWpS4C9@cluster0.odyhvee.mongodb.net/?retryWrites=true&w=majority"),
    MongooseModule.forRoot("mongodb://localhost:27017/"),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 100,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    UsersModule,
    AuthModule,
    HotelsModule,
    HotelroomsModule,
    ReservationsModule,
    SupportModule,
    SocketModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
