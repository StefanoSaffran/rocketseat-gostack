import React, { useState, useEffect } from 'react';

import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import api from '~/services/api';
import history from '~/services/history';

import { Container, MembershipList } from './styles';

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const textAlignStyle = {
    textAlign: 'center',
  };

  useEffect(() => {
    const loadMemberships = async () => {
      const response = await api.get('memberships');

      setMemberships(
        response.data.map(m => ({
          ...m,
          start_date: format(parseISO(m.start_date), "d 'de' MMMM 'de' yyyy", {
            locale: pt,
          }),
          end_date: format(parseISO(m.end_date), "d 'de' MMMM 'de' yyyy", {
            locale: pt,
          }),
        }))
      );
      setLoading(false);
    };

    loadMemberships();
  }, []);

  const handleEdit = studentId => {
    history.push(`memberships/${studentId}`);
  };

  const handleDelete = async membership => {
    try {
      const confirm = window.confirm(
        `Confirmar exclusão da matricula ${membership.name} ?`
      );

      if (confirm) {
        await api.delete(`memberships/${membership.student_id}`);
        setMemberships(memberships.filter(m => m.id !== membership.id));
        toast.success('Aluno excluido com sucesso');
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <div>
            <h1>Gerenciando matrículas</h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('memberships/new')}
              >
                <MdAdd size={18} />
                <span>CADASTRAR</span>
              </button>
            </div>
          </div>
          <MembershipList>
            <li>
              <strong>ALUNO</strong>
              <strong style={textAlignStyle}>PLANO</strong>
              <strong style={textAlignStyle}>INÍCIO</strong>
              <strong style={textAlignStyle}>TÉRMINO</strong>
              <strong style={textAlignStyle}>ATIVA</strong>
            </li>
            {memberships.map(membership => (
              <li key={membership.id}>
                <span>{membership.student.name}</span>
                <span style={textAlignStyle}>{membership.plan.title}</span>
                <span style={textAlignStyle}>{membership.start_date} </span>
                <span style={textAlignStyle}>{membership.end_date}</span>
                <span style={textAlignStyle}>
                  <MdCheckCircle
                    size={18}
                    color={membership.active ? '#42cb59' : '#ddd'}
                  />
                </span>
                <div>
                  <button
                    type="button"
                    disabled={membership.active}
                    className="edit-button"
                    onClick={() => handleEdit(membership.student_id)}
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(membership)}
                  >
                    apagar
                  </button>
                </div>
              </li>
            ))}
          </MembershipList>
        </>
      )}
    </Container>
  );
}
