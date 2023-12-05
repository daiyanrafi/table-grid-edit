import { ExampleDataItem } from "../model";


  export const fetchExampleData = async (): Promise<ExampleDataItem[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.slice(0, 100);
    } catch (error) {
      console.error(error);
      return [];
    }
  };