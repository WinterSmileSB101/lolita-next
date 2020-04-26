import { Controller, UseInterceptors, Get } from "@nestjs/common";
import { RenderHtmlInterceptor } from "@lolita/server-side/interceptors/renderHtml/render.interceptor";
import { RenderHtml } from "@lolita/server-side/decorators/render/render.decorator";
import Home from "../page/home/home-index.view";

@Controller('home')
@UseInterceptors(RenderHtmlInterceptor)
export class HomeController{
    
    @RenderHtml(Home)
    @Get()
    index(){
        return null;
    }
}