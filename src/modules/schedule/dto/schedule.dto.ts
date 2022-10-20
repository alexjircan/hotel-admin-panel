import {IsDate, IsDateString, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'

export class UpdateEventDto {

    @IsNotEmpty()
    @IsNumber()
    @IsDefined()
    id: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsDateString()
    @IsOptional()
    start?: Date;

    @IsOptional()
    @IsDateString()
    end?: Date;
}

export class CreateEventDto {
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    start: Date;

    @IsOptional()
    @IsNotEmpty()
    end: Date;
}