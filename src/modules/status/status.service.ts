import { Injectable } from "@nestjs/common";

@Injectable()
export class StatusService {
    public async getTemperature() {
        return {
            temperature: 19,
        };
    }
}