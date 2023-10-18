import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IUser } from './IUser';
import { OnbaordRequestDto } from 'src/auth/dto/requests/onboard.request.dto';


@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async welcome(newEmployee: OnbaordRequestDto, password: string, forWhat: string, url: string): Promise<void> 
  {
      const emailSent = await this.mailerService.sendMail({
        to: newEmployee.email,
        from: 'HR-Core <support@example.com>',
        subject: 'HR-Core: We welcome you on board',
        template: 'nehw',
        context: {
          fullname: `${newEmployee.firstName} ${newEmployee.surName}`,
          password: password,
          forWhat: forWhat,
          url: url,
          employeeId: newEmployee.employeeId
        },
      });
      return emailSent;
  }

  async forgotPassword(newEmployee: OnbaordRequestDto, verificationCode: string, forWhat: string, url: string): Promise<{}> 
  {   
      const verificationSent = await this.mailerService.sendMail({
        to: newEmployee.email,
        from: 'HR-Core <support@example.com>',
        subject: 'HR-Core: Account Verification',
        template: 'forgot',
        context: {
            fullname: `${newEmployee.firstName} ${newEmployee.surName}`,
            forWhat: forWhat,
            url: url,
            code: verificationCode
        },
      });
      return verificationSent;
  }

}
