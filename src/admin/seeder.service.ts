import { Injectable, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly adminService: AdminService) {}

  async seedAdminUser() {
    try {
      const adminData = {
        fname: 'Admin',
        lname: 'User',
        email: 'admin@example.com',
        password: 'admin123',
      };

      const newAdmin = await this.adminService.create(adminData);
    } catch (error) {
      this.logger.error('Could not seed admin', error.message);
    }
  }
}
