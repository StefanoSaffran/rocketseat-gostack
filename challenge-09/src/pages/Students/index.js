import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { MdPersonAdd } from 'react-icons/md';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';

import { Container, StudentList, PageButtons } from './styles';

import { deleteStudentsRequest } from '~/store/modules/students/actions';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const textAlignStyle = {
    textAlign: 'center',
  };

  const loadStudents = async () => {
    try {
      const { data } = await api.get('students', {
        params: { page, filter },
      });

      setTotalPages(Math.ceil(data.count / 10));
      setStudents(data.students);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadStudents();
  }, [page]); //eslint-disable-line

  const handleEdit = id => {
    history.push(`students/${id}`);
  };

  const handleDelete = student => {
    confirmAlert({
      title: 'Confirme a exclusão',
      message: `Deseja remover o aluno ${student.name} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(deleteStudentsRequest(student.id));
            setStudents(students.filter(s => s.id !== student.id));
          },
        },
        {
          label: 'No',
          onClick: () => '',
        },
      ],
    });
  };

  const handleSearch = () => {
    if (page === 1) return loadStudents();

    return setPage(1);
  };

  // filtro de alunos com regex - porem só filtra os alunos ja buscados,
  // com a paginação não serve mais pois estou retornando 10 alunos por pagina.

  /*   const filteredStudents = filter
    ? students.filter(student => {
        const regex = new RegExp(filter, 'i');
        return regex.test(student.name);
      })
    : students; */

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
                onKeyPress={e => (e.key === 'Enter' ? handleSearch() : '')}
              />
            </div>
          </div>
          {!students.length ? (
            <p>Nenhum aluno encontrado...</p>
          ) : (
            <>
              <StudentList>
                <li>
                  <strong>NOME</strong>
                  <strong>E-MAIL</strong>
                  <strong style={textAlignStyle}>IDADE</strong>
                </li>
                {students.map(student => (
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
                      <button
                        type="button"
                        onClick={() => handleDelete(student)}
                      >
                        apagar
                      </button>
                    </div>
                  </li>
                ))}
              </StudentList>
              <PageButtons>
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                >
                  <FaAngleDoubleLeft size={20} />
                </button>
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <FaAngleLeft size={20} />
                </button>
                <p>{page}</p>
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <FaAngleRight size={20} />
                </button>
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage(totalPages)}
                >
                  <FaAngleDoubleRight size={20} />
                </button>
              </PageButtons>
            </>
          )}
        </>
      )}
    </Container>
  );
}
