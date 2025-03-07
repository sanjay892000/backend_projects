
function PlayersCard(props) {
    const { name, image, role, birth_place, country, id } = props;

    const deletePlayers = async () => {
        console.log(id)
        try {
            await fetch(`http://localhost:5000/api/indian/cricket/team/deleteplayers/${id}`,{
                method:'DELETE'
            });
            console.log('Deleted')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="player-card">
            <svg className="deletelogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={deletePlayers}><path fill="red" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
            <img src={image} alt="loading..." />
            <h1>Name: {name}</h1>
            <p>role: {role}</p>

            <div className="batting">
                <p>birth place: {birth_place}</p>
                <p>Bowling Style: {country}</p>
            </div>
        </div>
    )
}

export default PlayersCard
