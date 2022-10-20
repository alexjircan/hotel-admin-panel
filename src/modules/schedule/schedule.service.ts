import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';
import { PrismaService } from "../../core/prisma/prisma.service";
import { CreateEventDto, UpdateEventDto } from "./dto";

@Injectable()
export class ScheduleService {
  constructor(private readonly $prisma: PrismaService){}

    async getEvents(){
      return this.$prisma.event.findMany();
    }

    async createEvent(dto: CreateEventDto){
      return await this.$prisma.event.create({
        data: {
          title: dto.title,
          start: dto.start,
          end: dto.start,
        }
      })
    }

    async deleteEvent(id: number){
      try{
        await this.$prisma.event.delete({
          where: {
            id: id,
          }
        });
        return {
          status: "Deleted"
        }
      }
      catch(error){
        if( error instanceof PrismaClientKnownRequestError ){
          if( error.code === 'P2025' )
           throw new ForbiddenException("hopa");
        }
        throw error;
      }
    }

    async updateEvent(dto: UpdateEventDto){
      try{
        const success = await this.$prisma.event.updateMany({
          where: {
            id: dto.id
          },
          data: {
            title: dto.title,
            start: dto.start,
            end: dto.end,
          }
        });
        return success.count == 1;
      }
      catch(error){
        if( error instanceof PrismaClientKnownRequestError ){
          throw new ForbiddenException(
            'DB Exception',
          )
        }
        throw error;
      }
    }
}