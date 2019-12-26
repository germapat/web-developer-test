import { IsNotEmpty} from 'class-validator';


export class ConfirmRegistrationDto {
    @IsNotEmpty()
    readonly code: string;
    
    @IsNotEmpty()
    readonly identificationType: string;
}