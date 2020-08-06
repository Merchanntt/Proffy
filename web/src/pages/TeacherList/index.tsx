import React from 'react';

import Header from '../../components/Header';

import './styles.css';
import ListContent from '../../components/ListContent';
import Input from '../../components/Input';

const TeacherList: React.FC = () => (
  <div id="page-teacher-list" className="container">
    <Header title="Estes são os proffys disponíveis.">
      <form id="search-teachers">
        <Input
          label="Matérias"
          name="subject"
        />

        <Input
          label="Dias da semana"
          name="week-day"
        />

        <Input
          label="Horário"
          name="time"
          type="time"
        />
      </form>
    </Header>
    <main>
      <ListContent />
      <ListContent />
      <ListContent />
      <ListContent />
    </main>
  </div>
);

export default TeacherList;
