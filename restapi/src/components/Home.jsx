import { useEffect, useState } from 'react';
import PlayersCard from './PlayersCard';

function Home() {

    const [players, setPlayers] = useState([]);

    const fetchPlayersData = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/indian/cricket/team/allplayers')
            let result = await response.json();
            console.log(result)
            setPlayers(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPlayersData()
    },[])

    console.log(players)


    return (
        <div className='main-page'>
            <h1>Indian Cricket Players List</h1>
            <p><span> </span>Indian cricket players</p>
            <div className='playerlist'>
                {players.map((player, i) => {
                    return (
                        <PlayersCard key={i} name={player.name} image={player.image} role={player.role} birth_place={player.birth_place} country={player.country} id={player._id} />
                    )
                })}

            </div>
        </div>
    )
}

export default Home
