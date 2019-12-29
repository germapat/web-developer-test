import { IsNotEmpty} from 'class-validator';


export class TaskAllDto {
    @IsNotEmpty()
    readonly owner: string;
}
