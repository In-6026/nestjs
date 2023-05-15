import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(ip: string, HostParam: any): string {
    console.log(HostParam)
    return `Hello ${ip}`;
  }
}
