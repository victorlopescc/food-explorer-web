import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { api } from '../../services/api';

import { RxCaretLeft } from 'react-icons/rx';

import { Container, Content } from './styles';

import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { ButtonText } from '../../components/ButtonText';
import { Favorite } from '../../components/Favorite';
import { Footer } from '../../components/Footer';

export function Favorites({ isAdmin }) {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);

    function handleBack() {
        navigate(-1);
    }

    const removeFavorite = async (dishId) => {
        try {
            await api.delete(`/favorites/${dishId}`)

            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== dishId))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await api.get('/favorites')
                setFavorites(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchFavorites();
    }, [])

    return (
        <Container>
            {
                !isDesktop &&
                <Menu isAdmin={isAdmin} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            }
            <Header isAdmin={isAdmin} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {
                favorites &&
                <main>
                    <div>
                        <header>
                            <ButtonText onClick={handleBack}>
                                <RxCaretLeft />
                                voltar
                            </ButtonText>
                            <h1>Meus favoritos</h1>
                        </header>
                        <Content>
                            {
                                favorites.map(favorite => (<Favorite key={String(favorite.id)} data={favorite} removeFavorite={removeFavorite} />))
                            }
                        </Content>
                    </div>
                </main>
            }
            <Footer />
        </Container>
    )
}