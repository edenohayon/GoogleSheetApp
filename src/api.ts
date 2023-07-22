import axios from 'axios';
import { User } from './types';

const api = 'https://script.google.com/macros/s/AKfycbzu3afl8EBv2NK4tXRhIztxS2QFMMxIhC7aaTTeowGTPB-luX1DUAgeR9t-YraTA-niEQ/exec'

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
