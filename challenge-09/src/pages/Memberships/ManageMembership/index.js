import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { MdKeyboardArrowLeft, MdSave } from 'react-icons/md';
import { addMonths, parseISO } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';

import { Container, Header, Student, Info } from './styles';

export default function ManageMembership() {
  const [membership, setMembership] = useState(null);
  const [students, setStudents] = useState({});
  const [plans, setPlans] = useState({});
  const { studentId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      const getMembership = async () => {
        const response = await api.get(`/memberships/${studentId}`);

        await setMembership({
          ...response.data,
          start_date: parseISO(response.data.start_date),
          end_date: parseISO(response.data.end_date),
          student: {
            name: response.data.student.name,
            label: response.data.student.name,
          },
          plan: {
            title: response.data.plan.title,
            label: response.data.plan.title,
          },
        });
        setLoading(false);
      };

      getMembership();
    }
  }, [studentId]);

  useEffect(() => {
    if (!studentId) {
      const loadStudents = async () => {
        const response = await api.get('students');

        const data = response.data.map(student => ({
          ...student,
          label: student.name,
        }));
        setStudents(data);
      };

      loadStudents();
    }
  }, [studentId]);

  useEffect(() => {
    setLoading(true);
    const loadPlans = async () => {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        ...plan,
        label: plan.title,
      }));
      setPlans(data);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (studentId) {
        const data = {
          start_date: membership.start_date,
          plan_id: membership.plan_id,
        };

        await api.put(`memberships/${studentId}`, { ...data });

        toast.success('Matrícula atualizada com sucesso');
        history.push('/memberships');
      } else {
        const data = {
          start_date: membership.start_date,
          plan_id: membership.plan_id,
          student_id: membership.student_id,
        };

        await api.post('memberships', { ...data });

        toast.success('Matrícula realizada com sucesso');
        history.push(`/memberships/${membership.student_id}`);
      }
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Header>
            <h1>
              {studentId ? 'Edição de matrícula' : 'Cadastro de matrícula'}
            </h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('/memberships')}
              >
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-memberships">
                <MdSave size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <form id="form-memberships" onSubmit={handleSubmit}>
            <Student>
              <span className="inputStyle">ALUNO </span>
              <Select
                isDisabled={studentId}
                classNamePrefix="select-student"
                label="ALUNO"
                options={students}
                multiple={false}
                name="name"
                placeholder="Buscar aluno"
                value={membership ? membership.student : ''}
                onChange={e =>
                  setMembership({
                    ...membership,
                    student_id: e.id,
                    student: { ...e, label: e.name },
                  })
                }
              />
            </Student>
            <Info>
              <span className="inputStyle">
                PLANO
                <Select
                  label="PLANO"
                  options={plans}
                  multiple={false}
                  name="plan"
                  placeholder="Buscar plano"
                  value={membership ? membership.plan : ''}
                  onChange={e =>
                    setMembership({
                      ...membership,
                      plan_id: e.id,
                      plan: { ...e, label: e.title },
                      price: e.price * e.duration,
                    })
                  }
                />
              </span>
              <span className="inputStyle">
                DATA DE INÍCIO
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="start_date"
                  placeholder="Escolha a data"
                  minDate={!studentId && new Date()}
                  selected={membership ? membership.start_date : ''}
                  onChange={date => {
                    setMembership({
                      ...membership,
                      start_date: date,
                      end_date: addMonths(date, membership.plan.duration),
                    });
                  }}
                />
              </span>
              <span className="inputStyle">
                DATA DE TÉRMINO
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="end_date"
                  disabled
                  placeholder="Data de termino"
                  selected={membership ? membership.end_date : ''}
                />
              </span>
              <span className="inputStyle">
                VALOR FINAL
                <NumberFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={2}
                  prefix="R$ "
                  name="price"
                  value={membership ? membership.price : ''}
                  disabled
                />
              </span>
            </Info>
          </form>
        </>
      )}
    </Container>
  );
}
