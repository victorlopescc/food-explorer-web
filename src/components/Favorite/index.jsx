import { api } from '../../services/api';

import { Container } from './styles';

export function Favorite({ data, removeFavorite }) {
    return (
        <Container>
            <img src={`${api.defaults.baseURL}/files/${data.image}`} />
            <div>
                <h2>{data.name}</h2>
                <button onClick={() => removeFavorite(data.id)}>Remover dos Favoritos</button>
            </div>
        </Container>
    )
}