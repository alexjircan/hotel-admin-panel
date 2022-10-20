import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateEventDto, UpdateEventDto } from "./dto";
import { ScheduleService } from "./schedule.service";
  

@Controller()
export class ScheduleController {

    constructor( 
        private readonly $scheduleService: ScheduleService,
        ){}

    @Get('/events')
    async getEvents(){
        return this.$scheduleService.getEvents();
    }

    @Post('/update-event')
    async updateEvent(@Body() eventDto: UpdateEventDto ){
        if( await this.$scheduleService.updateEvent(eventDto) )
            return { status: "Updated" }
        return {status: "Event doesn't exists"};
    }

    @Post('/create-event')
    createEvent(@Body() eventDto: CreateEventDto) {
        return this.$scheduleService.createEvent(eventDto);
    }

    @Delete('/delete-event')
    deleteEvent(@Body() deleteDto){
        return this.$scheduleService.deleteEvent(deleteDto.id);
    }
}