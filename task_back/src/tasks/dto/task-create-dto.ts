import { IsNotEmpty} from 'class-validator';
export class TaskCreateDto {
    @IsNotEmpty()
    owner: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    priority: string;

    @IsNotEmpty()
    expirationDate: string;
    
    status: string;
    
    
}
