import { useQuery } from "@tanstack/react-query";

// export type DrinkArticleType = {
//     name: string;
//     EAN: number;
//     description: string;
//     imageUrl: string;
// }
    export interface DrinkArticle {
        id: number;
        Name: string;
        Brand: string;
        Refridgerate: boolean;
        Description: Array<{
            type: string;
            children: Array<{
                type: string;
                text: string;
            }>;
        }>;
        Expiry_Date: string;
        EAN_Code: string;
        Image_Url: string;

    }

export default function AddDrink() {

    const getAllDrinks = async () : Promise<DrinkArticle[]> => {
        const response = await fetch ('http://localhost:1337/api/drinks');
        if (!response.ok) {
          alert('problem fetching data');
    
        }
        const drinkArticlesData = await response.json();
        return drinkArticlesData.data;
      };
      const { data, isLoading, error } = useQuery<DrinkArticle[], Error>({ 
        queryKey: ['drinks'], 
        queryFn: getAllDrinks
      })
      if (isLoading) return <p>'...Loading'</p>
      if (error instanceof Error) return <p>Error: {error.message}</p>

    console.table(data);
    const NewProduct = "Drink";

    return (
        <section className="m-10">
                <h1 className="p-4 text-lg">Inventory:</h1>
                {data?.map((drink) => (
                    <div key={drink.EAN_Code} className="Section flex justify-center border-stone-500 m-4 p-2 w-96"> 
                        <div>
                            <img src={drink.Image_Url} width={120}/>
                        </div>
                        <div className="flex-column text-left mb-20 p-4">
                            <h3 className="font-bold underline">{drink.Name}</h3>
                            <p className="">EAN code: {drink.EAN_Code}</p>
                            <p>Brand: {drink.Brand}</p>
                        </div>
                        
                    </div>
                ))}
            <div>
                <h2>Input {NewProduct}</h2>
            </div>  
        </section>      
    );                    
}