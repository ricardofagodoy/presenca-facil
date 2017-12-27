import React from 'react';
import { hashHistory } from 'react-router';
import ClassService from '../../services/ClassService';
import GroupService from '../../services/GroupService';
import StudentService from '../../services/StudentService';
import CourseService from '../../services/CourseService';
import ReportModal from './ReportModal';
import './rules.js';

import Validation from 'react-validation';


export default class GenerateReport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupItens: [], courseItens: [], studentItens: [], group: '1',
      course: '0', student: '0', startDate: '', endDate: '', success: 0, error: '', 
      report: {}
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.onGroupDropdownSelected = this.onGroupDropdownSelected.bind(this);
    this.onCourseDropdownSelected = this.onCourseDropdownSelected.bind(this);
    this.onStudentDropdownSelected = this.onStudentDropdownSelected.bind(this);
    this.getStudentAttendances = this.getStudentAttendances.bind(this);

    this.handleGenerateReport = this.handleGenerateReport.bind(this);

    this.createGroupItems();

    this.createCourseItems();
  }

  createGroupItems() {
    GroupService.getAllGroups()
      .then((response) => {

        let groupItens = [];

        response.data.object.forEach(function (turma) {
          groupItens.push(<option key={turma.id} value={turma.id}>{turma.nome}</option>);
        });

        this.setState({ groupItens: groupItens })
        this.setState({ group: response.data.object[0].id })
        this.setState({ report: { ...this.state.report, group: response.data.object[0].nome } })

        this.createStudentItems(response.data.object[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onGroupDropdownSelected(e) {
    this.setState({ group: e.target.value });
    this.createStudentItems(e.target.value);
    this.setState({ report: { group: e.target.options[e.target.selectedIndex].text } })

  }

  createCourseItems() {
    CourseService.getAllCourses()
      .then((response) => {
        let courseItens = [];

        courseItens.push(<option key="0" value="0">Selecione uma materia</option>);

        response.data.object.forEach(function (materia) {
          courseItens.push(<option key={materia.id} value={materia.id}>{materia.nome}</option>);
        });

        this.setState({ courseItens: courseItens })
        this.setState({ course: response.data.object[0].id })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onCourseDropdownSelected(e) {
    this.setState({ course: e.target.value });
  }

  createStudentItems(groupId) {
    GroupService.getStudentsFromGroup(groupId)
      .then((response) => {
        let studentItens = [];
        let students = [];

        studentItens.push(<option key="0" value="0">Selecione um aluno</option>);

        response.data.object.alunos.forEach(function (aluno) {
          studentItens.push(<option key={aluno.id} value={aluno.id}>{aluno.nome}</option>);
          students.push(aluno);
        });

        this.setState({ report: { ...this.state.report, students: students } });
        this.setState({ studentItens: studentItens })
        this.setState({ student: response.data.object.id })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onStudentDropdownSelected(e) {
    this.setState({ student: e.target.value });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleGenerateReport(e) {
    e.preventDefault();

    this.getStudentAttendances();
  }

  getStudentAttendances() {
    let attendances = [];

    this.state.report.students.map(aluno => {
      StudentService.getAttendances(aluno.id).then((response) => {
        aluno.presencas = response.data.object;

        this.setState({report: {...this.state.report,  students: [ ...this.state.report.students, aluno]}})
        
      })
        .catch((error) => {
          console.log(error);
        });

    })
  }

  render() {
    return (

      <div>
        
        {  this.state.report.students ? <ReportModal report={this.state.report} /> : '' }

        <div className="container">
          <div className="form-horizontal">
            <div className="search-form" id="search-form">
              <Validation.components.Form>
                <div className="form-group">
                  <h3>Gerar Relatório</h3>
                </div>

                <div className={this.state.success ? '' : 'hidden'}>
                  <div className="alert alert-success">
                    Relatório gerado com sucesso.
                </div>
                </div>
                <div className={this.state.error ? '' : 'hidden'}>
                  <div className="alert alert-danger">
                    {this.state.error}
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-3" htmlFor="name">Turma: </label>
                  <div className="col-sm-3">
                    <select className="form-control" onChange={this.onGroupDropdownSelected} label="Turma">
                      {this.state.groupItens}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-3" htmlFor="name">Matéria: </label>
                  <div className="col-sm-3">
                    <select className="form-control" onChange={this.onCourseDropdownSelected} label="Matéria">
                      {this.state.courseItens}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-3" htmlFor="name">Aluno: </label>
                  <div className="col-sm-3">
                    <select className="form-control" onChange={this.onStudentDropdownSelected} label="Aluno">
                      {this.state.studentItens}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-7"> </div>
                  <div className="col-sm-2">
                    <Validation.components.Button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal" onClick={this.handleGenerateReport}>
                      Gerar Relatorio
                </Validation.components.Button>
                  </div>
                </div>
              </Validation.components.Form>
            </div>
          </div>
        </div>

      </div>

    );
  }
}
