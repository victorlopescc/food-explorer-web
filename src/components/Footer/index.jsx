import { Container, Brand, Copyright } from './styles';

import brand from '../../assets/brand.svg'

export function Footer() {
    return (
        <Container>
            <Brand>
                <img src={brand} alt="Logo" />
            </Brand>
            <Copyright>
                © 2024 - Todos os direitos reservados.
            </Copyright>
        </Container>
    )
}