import { IsNotEmpty} from 'class-validator';


export class TaskDto {
    @IsNotEmpty()
    readonly _id: string;
}
