import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { MdPersonAdd } from 'react-icons/md';

import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';

import { Container, StudentList } from './styles';

import { deleteStudentsRequest } from '~/store/modules/students/actions';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const textAlignStyle = {
    textAlign: 'center',
  };

  useEffect(() => {
    const loadStudents = async () => {
      const response = await api.get('students');

      setStudents(response.data);
      setLoading(false);
    };

    loadStudents();
  }, []);

  const handleEdit = id => {
    history.push(`students/${id}`);
  };

  const handleDelete = student => {
    const confirm = window.confirm(
      `Confirmar remoção do aluno ${student.name} ?`
    );

    if (confirm) {
      dispatch(deleteStudentsRequest(student.id));
      setStudents(students.filter(s => s.id !== student.id));
    }
  };

  const filteredStudents = filter
    ? students.filter(student => {
        const regex = new RegExp(filter, 'i');
        return regex.test(student.name);
      })
    : students;

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <div>
            <h1>Gerenciando alunos</h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('students/new')}
              >
                <MdPersonAdd size={18} />
                <span>CADASTRAR</span>
              </button>
              <input
                type="text"
                placeholder="Buscar aluno"
                onChange={({ target }) => setFilter(target.value)}
              />
            </div>
          </div>
          {filteredStudents.length === 0 ? (
            <h1>Nenhum aluno encontrado.. Cadastre um aluno no botão acima.</h1>
          ) : (
            <StudentList>
              <li>
                <strong>NOME</strong>
                <strong>E-MAIL</strong>
                <strong style={textAlignStyle}>IDADE</strong>
              </li>
              {filteredStudents.map(student => (
                <li key={student.id}>
                  <span>{student.name}</span>
                  <span>{student.email}</span>
                  <span style={textAlignStyle}>{student.age}</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleEdit(student.id)}
                    >
                      editar
                    </button>
                    <button type="button" onClick={() => handleDelete(student)}>
                      apagar
                    </button>
                  </div>
                </li>
              ))}
            </StudentList>
          )}
        </>
      )}
    </Container>
  );
}
