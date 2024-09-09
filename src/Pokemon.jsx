import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";


export const Pokemon = () =>{

    const [pokemon , setPokemon] = useState([]);
    const [loding, setLoding] = useState(true);
    const [error, setError] = useState(null);
    const [search , setSearch] = useState('')
    const API = "https://pokeapi.co/api/v2/pokemon?limit=100";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
           // console.log(data)
            const detailedPokemondata = data.results.map(async(curPokemon)=>{
                const res = await fetch(curPokemon.url) 
                const data = await res.json()
                return data;
            })
            //console.log(detailedPokemondata)

            const detailedResponses = await Promise.all(detailedPokemondata)
            console.log(detailedResponses)
            setPokemon(detailedResponses)
            setLoding(false)
        } catch (error) {
            console.log(error)
            setLoding(false)
            setError(error)
        }
    }
   useEffect(() =>{
    fetchPokemon();
   }, [])

   //Search Functanility
   const searchData = pokemon.filter((curPokemon)=> curPokemon.name.toLowerCase().includes(search.toLowerCase()) );

   if (loding) {
    return(
        <div>
        <h1>Loading....</h1>
        </div>
    )
   }

   if (error) {
    return(
       <div>
        <h1>{error.message}</h1>
       </div>
    )
   }
    return<>
    <section>
        <header className="container">
            <h1>Lets Catch Pokemon</h1>
        </header>

        <div className="pokemon-search">
            <input type="text" 
            placeholder=" Search Pokemon" 
            value={search} 
            onChange={((e)=>setSearch(e.target.value))}/> 
        </div>
        
        <div className="main">
            <ul className="cards">
                {
                  //  pokemon.map((curPokemon)=>{
                    searchData.map((curPokemon)=>{
                        return (
                            <PokemonCards key={curPokemon.id} pokemonData = {curPokemon}/>
                        )
                        
                    })
                };
            </ul>
        </div>
        
   </section>
    </>
}