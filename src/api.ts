import axios from 'axios';
import { User } from './types';

const api = 'https://script.google.com/macros/s/AKfycbyYgZ3_AYt_qmyKAtT1X-08aMLBjAzhaADjKeEhUjSEI15vwjcDIPRecnbVK6PKscfppA/exec'

export const getUsersRequest = async (): Promise<User[]> => {
    try {
        const response = await axios.get(api);
        return response.data.names

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const updateUserAgeByIdRequest = async (id: string, age: string): Promise<User[]> => {
    try {
        const response = await axios.get(`${api}?update=true&id=${id}&data=${age}`);
        return response.data.names

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}
