import { useEffect } from 'react'
import { useState } from 'react'

import { DecimaQuintaAulaItem } from '../../components/DecimaQuintaAulaItem'

import './style.scss'

export function DecimaQuintaAula() {

    const [locations, setLocations] = useState([])
    const [cep, setCep] = useState('')
    
    function searchCep(cepRecieved) {

        setCep(cepRecieved)

        if(cepRecieved.length === 8) {

            fetch(`https://viacep.com.br/ws/${cepRecieved}/json/`).then(
                response => {
                    response.json().then(
                        address => {

                            if(address.erro !== undefined) {

                                return alert('please add valid cep')

                            } else {

                                // Deu Sucesso
                                setLocations([...locations, address])

                            }
                        }
                    )
                }
            )

        }

    }



    function deleteLocation(currentLocation) {
        const data = locations.filter(i => i.cep !== currentLocation.cep)
        setLocations(data)
    }

    return(

        <div className="decima-quarta-aula-component">

            <form>

                <h1>Cadastrar endereços</h1>

                <div>
                    <label>Cep</label>
                    <input
                        type="number"
                        value={cep}
                        onChange={event => searchCep(event.target.value)}
                    />
                </div>

                <button>Cadastrar</button>

            </form>

            <section className="locations">

                {
                    locations.map(
                        (location, index) => (
                            <DecimaQuintaAulaItem
                                key={index}
                                data={location}
                                onDeleteLocation={currentLocation => deleteLocation(currentLocation)}
                            />
                        )
                    )
                }

            </section>

        </div>

    )

}