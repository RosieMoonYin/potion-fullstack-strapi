import { useQuery } from '@tanstack/react-query';
import './App.css'


export interface Potion {
  id: number;
  documentId: string;
  potionName: string;
  potionDescription: string;
  potionId?: string;
  Author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function App() {

  const getAllPotions = async () : Promise<Potion[]> => {
    const response = await fetch ('http://localhost:1337/api/potions');
    if (!response.ok) {
      alert('problem fetching data');

    }
    const potionData = await response.json();
    return potionData.data;
  };
  const { data, isLoading, error } = useQuery<Potion[], Error>({ 
    queryKey: ['potions'], 
    queryFn: getAllPotions
  })
  if (isLoading) return <p>'...Loading'</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>
  
  
  return (
    <>
        <h1>Get Data</h1>
        <h2>Potions</h2>
      <div className="potions">
        {data?.map((potion) => (
          <div key={potion.id} className="potions">
            <h3>{potion.potionName}</h3>
            <p>{potion.potionDescription}</p>
          </div>
        ))}
      </div>
        
    </>
  )
}
