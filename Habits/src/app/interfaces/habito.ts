import { Habito } from '../models/habito';

export interface apiResponse {
    data: Habito[];
    message: string;
}