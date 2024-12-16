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
        <section>
                <h1>Inventory:</h1>
                {data?.map((drink) => (
                    <div key={drink.EAN_Code} className="Section"> 
                        <p>
                            <img src={drink.Image_Url} width={120}/>
                        </p>
                        <h3 className="text-white">{drink.Name}</h3>
                        <p className="text">EAN code: {drink.EAN_Code}</p>
                        <p>Brand: {drink.Brand}</p>
                    </div>
                ))}
            <div>
                <h2>Input {NewProduct}</h2>
            </div>  
        </section>      
    );                    
}