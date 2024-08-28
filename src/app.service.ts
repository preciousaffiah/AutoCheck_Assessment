import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: String, status: String, timestamp: String } {
    return {
      message:
        "🚀 Welcome aboard! You've just landed on our API. Fasten your seatbelt, and let's build something awesome!",
      status: 'success',
      timestamp: new Date().toISOString(),
    };
  }
}
