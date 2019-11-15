import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';

import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';

import { Container, PlanList } from './styles';

import { deletePlanRequest } from '~/store/modules/plans/actions';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const textAlignStyle = {
    textAlign: 'center',
  };

  useEffect(() => {
    const loadPlans = async () => {
      const response = await api.get('plans');

      setPlans(response.data);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const handleEdit = id => {
    history.push(`/plans/${id}`);
  };

  const handleDelete = plan => {
    const confirm = window.confirm(
      `Confirmar remoção do plano ${plan.title} ?`
    );

    if (confirm) {
      dispatch(deletePlanRequest(plan.id));
      setPlans(plans.filter(s => s.id !== plan.id));
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <div>
            <h1>Gerenciando planos</h1>
            <div>
              <button type="button" onClick={() => history.push('/plans/new')}>
                <MdAdd size={18} />
                <span>CADASTRAR</span>
              </button>
            </div>
          </div>
          <PlanList>
            <li>
              <strong>TÍTULO</strong>
              <strong style={textAlignStyle}>DURAÇÃO</strong>
              <strong style={textAlignStyle}>VALOR p/ MÊS</strong>
            </li>
            {plans.map(plan => (
              <li key={plan.id}>
                <span>{plan.title}</span>
                <span style={textAlignStyle}>{plan.duration}</span>
                <span style={textAlignStyle}>{plan.price}</span>
                <div>
                  <button type="button" onClick={() => handleEdit(plan.id)}>
                    editar
                  </button>
                  <button type="button" onClick={() => handleDelete(plan)}>
                    apagar
                  </button>
                </div>
              </li>
            ))}
          </PlanList>
        </>
      )}
    </Container>
  );
}
