import { Controller, Get } from '@nestjs/common';
import { HomeDto } from 'src/dto/home.dto';
import { AppService } from 'src/services/app.service';

@Controller('')
export class AppController {
    constructor(private readonly AppService: AppService) {}
    @Get("")
    Home(): HomeDto {
        return this.AppService.welcome();
    }
}
