import { useEffect, useState } from 'react'

export default function People()
{
    const [ people, setPeople ] = useState([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Sudo' },
        { id: 4, name: 'Boy' }
    ])

    const getPeople = async () =>
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)
    }

    useEffect(() =>
    {
        getPeople()
    }, [])


    return <div>
        <h2>People</h2>

        <ul>
            { people.map(person => 
                <li key={ person.id }>{ person.name }</li>
            ) }
        </ul>
    </div>
}