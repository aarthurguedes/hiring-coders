import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import * as S from './styled'

export default function Home() {
  const [ user, setUser ] = useState('')
  const [ error, setError ] = useState(false)
  const history = useHistory()

  const handleSearch = () => {
    const gitHubAPI = `https://api.github.com/users/${user}/repos`
    
    axios.get(gitHubAPI)
      .then(response => {
        const respositories = response.data
        const respositoriesName = respositories.map(repository => repository.name)
        localStorage.setItem('repositoriesName', JSON.stringify(respositoriesName))
        history.push('/repositories')
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className="userInput" placeholder="User" 
          value={user} onChange={e => setUser(e.target.value)} />
        <S.Button type="button" onClick={handleSearch}>Search</S.Button>
      </S.Content>
      { error ? <S.ErrorMsg>An error has occurred. Try again.</S.ErrorMsg> : ''}
    </S.HomeContainer>
  );
}
