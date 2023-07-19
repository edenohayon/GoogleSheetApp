import axios from 'axios';
import googleSheetsConfig from './googleSheetsConfig';

export const fetchData = async () => {
    try {
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsConfig.spreadsheetId}/values/${googleSheetsConfig.sheetName}?range=A2:C&valueRenderOption=FORMATTED_VALUE&majorDimension=ROWS&key=${googleSheetsConfig.apiKey}`);
        console.log('response.data.results.length', response.data.values.length)
        return response.data.values
        .map(
            (item: [string, string, string]) =>
                ({ id: item[0], name: item[1], age: item[2] }))
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
