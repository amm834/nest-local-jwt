import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {LocalAuthGuard} from "./auth/local-auth-gurad";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth-gurad";
import {CurrentUser} from "./auth/current-usre.decorator";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly authService: AuthService,
    ) {
    }

    @Post('/auth/login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req, @CurrentUser() user) {
        console.log(user)
        return req.user;
    }
}
