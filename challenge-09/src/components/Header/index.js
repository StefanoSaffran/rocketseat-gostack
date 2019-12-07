import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkWrapper from '~/helpers/LinkWrapper';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-header.png';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="" />
          <LinkWrapper to="/students">ALUNOS</LinkWrapper>
          <LinkWrapper to="/plans">PLANOS</LinkWrapper>
          <LinkWrapper to="/memberships">MATRÍCULAS</LinkWrapper>
          <LinkWrapper to="/helporders">PEDIDOS DE AUXÍLIO</LinkWrapper>
        </nav>

        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSignout}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
