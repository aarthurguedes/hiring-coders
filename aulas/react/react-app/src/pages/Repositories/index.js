import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as S from './styled'

export default function Repositories() {
    const [ repositories, setRepositories ] = useState([])
    const history = useHistory()

    useEffect(() => {
        let repositoriesName = localStorage.getItem('repositoriesName')
        
        if (repositoriesName !== null) {
            repositoriesName = JSON.parse(repositoriesName)
            setRepositories(repositoriesName)
            localStorage.clear()
        } else {
            history.push('/')
        }
    }, [])

    return (
        <S.Container>
            <S.Title>Repositories</S.Title>
            <S.List>
                { repositories.map(repository => {
                    return (
                        <S.ListItem key={repository}>{ repository }</S.ListItem>
                    )
                }) }
            </S.List>
            <S.LinkHome to="/">Back</S.LinkHome>
        </S.Container>
    )
}