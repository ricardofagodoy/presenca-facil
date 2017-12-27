import React from 'react';
import { hashHistory } from 'react-router';
import ClassService from '../../services/ClassService';
import GroupService from '../../services/GroupService';
import TeacherService from '../../services/TeacherService';
import CourseService from '../../services/CourseService';
import LocaleService from '../../services/LocaleService';
import ImportClass from './ImportClass';
import './rules.js';

import Validation from 'react-validation';


export default class createClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupItens: [], courseItens: [], teacherItens: [], localeItens: [], group: '',
      course: '', teacher: '', locale: '', monday: false, tuesday: false,
      wednesday: false, thursday: false, friday: false, saturday: false,
      sunday: false, startTime: '', endTime: '', startDate: '',
      endDate: '', weekdays: [], success: 0, error: ''
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleWeekdaysChange = this.handleWeekdaysChange.bind(this);

    this.onGroupDropdownSelected = this.onGroupDropdownSelected.bind(this);
    this.onCourseDropdownSelected = this.onCourseDropdownSelected.bind(this);
    this.onTeacherDropdownSelected = this.onTeacherDropdownSelected.bind(this);
    this.onLocaleDropdownSelected = this.onLocaleDropdownSelected.bind(this);

    this.createGroupItems();
    this.createTeacherItems();
    this.createCourseItems();
    this.createLocaleItems();
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onGroupDropdownSelected(e) {
    this.setState({ group: e.target.value });
  }

  createCourseItems() {
    CourseService.getAllCourses()
      .then((response) => {
        let courseItens = [];

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

  createTeacherItems() {
    TeacherService.getAllTeachers()
      .then((response) => {
        let teacherItens = [];

        response.data.object.forEach(function (professor) {
          teacherItens.push(<option key={professor.id} value={professor.id}>{professor.nome}</option>);
        });

        this.setState({ teacherItens: teacherItens })
        this.setState({ teacher: response.data.object[0].id })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onTeacherDropdownSelected(e) {
    this.setState({ teacher: e.target.value });
  }

  createLocaleItems() {
    LocaleService.getAllLocale()
      .then((response) => {
        let localeItens = [];

        //localeItens.push(<option key={local.id} value={local.id}>{local.nome}</option>);

        response.data.object.forEach(function (local) {
          localeItens.push(<option key={local.id} value={local.id}>{local.nome}</option>);
        });

        this.setState({ localeItens: localeItens })
        this.setState({ locale: response.data.object[0].id })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLocaleDropdownSelected(e) {
    this.setState({ locale: e.target.value });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleWeekdaysChange(event) {
    let id = event.target.id;
    let checked = event.target.checked;
    let value = event.target.value;

    this.setState({ [id]: checked })

    let items = [];
    items = this.state.weekdays;

    if (checked) {
      items.push(value)
    } else {
      items.splice(items.indexOf(value), 1)
    }

    this.setState({ weekdays: items })
  }

  handleCreate(e) {
    e.preventDefault();

    ClassService.createClass(this.state.group, this.state.course, this.state.teacher, this.state.locale, this.state.startTime, this.state.endTime, this.state.startDate, this.state.endDate, this.state.weekdays)
      .then((response) => {
        console.log('Aula Criada!');

        this.setState({
          startTime: '', endTime: '', startDate: '', endDate: '', weekdays: [], success: 1, error: '', monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
        });
      })
      .catch((error) => {
        this.setState({
          startTime: '', endTime: '', startDate: '', endDate: '', weekdays: [], success: 0, error: error.message, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
        });
        console.log(error);
      });
  }


  render() {
    return (
      <div className="container">
        <div className="form-horizontal">
          <div className="search-form" id="search-form">
            <Validation.components.Form>
              <div className="form-group">
                <h3>Criar Aula</h3>
              </div>

              <div className="modal fade" id="myModal" role="dialog">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header">
											<button type="button" className="close" data-dismiss="modal">&times;</button>
											<h4 className="modal-title">Importar Aulas</h4>
										</div>
										<div className="modal-body">
											<ImportClass />
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
										</div>
									</div>
								</div>
							</div>

              <div className={this.state.success ? '' : 'hidden'}>
                <div className="alert alert-success">
                  Aula criada com sucesso.
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
                <label className="control-label col-sm-3" htmlFor="name">Professor: </label>
                <div className="col-sm-3">
                  <select className="form-control" onChange={this.onTeacherDropdownSelected} label="Professor">
                    {this.state.teacherItens}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">Local: </label>
                <div className="col-sm-3">
                  <select className="form-control" onChange={this.onLocaleDropdownSelected} label="Local">
                    {this.state.localeItens}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">Hora Inicio: </label>
                <div className="col-sm-3">
                  <Validation.components.Input className="form-control" id="startTime" name="startTime" type="time" validations={['required']} value={this.state.startTime} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">Hora Termino: </label>
                <div className="col-sm-3">
                  <Validation.components.Input className="form-control" id="endTime" name="endTime" type="time" validations={['required']} value={this.state.endTime} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">Data Inicio: </label>
                <div className="col-sm-3">
                  <Validation.components.Input className="form-control" id="startDate" name="startDate" type="date" validations={['required']} value={this.state.startDate} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="name">Data Termino: </label>
                <div className="col-sm-3">
                  <Validation.components.Input className="form-control" id="endDate" name="endDate" type="date" validations={['required']} value={this.state.endDate} onChange={this.handleInputChange} />
                </div>
              </div>
              <label className="control-label col-sm-3" htmlFor="name">Dias da Semana: </label>
              <label className="checkbox-inline" htmlFor="monday"><input type="checkbox" value="SEGUNDA" id="monday" checked={this.state.monday} onChange={this.handleWeekdaysChange} />Segunda-Feira</label>
              <label className="checkbox-inline" htmlFor="tuesday"><input type="checkbox" value="TERCA" id="tuesday" checked={this.state.tuesday} onChange={this.handleWeekdaysChange} />Terça-Feira</label>
              <label className="checkbox-inline" htmlFor="wednesday"><input type="checkbox" value="QUARTA" id="wednesday" checked={this.state.wednesday} onChange={this.handleWeekdaysChange} />Quarta-Feira</label>
              <label className="checkbox-inline" htmlFor="thursday"><input type="checkbox" value="QUINTA" id="thursday" checked={this.state.thursday} onChange={this.handleWeekdaysChange} />Quinta-Feira</label>
              <br></br>
              <div className="control-label col-sm-3"></div>
              <label className="checkbox-inline" htmlFor="friday"><input type="checkbox" value="SEXTA" id="friday" checked={this.state.friday} onChange={this.handleWeekdaysChange} />Sexta-Feira</label>
              <label className="checkbox-inline" htmlFor="saturday"><input type="checkbox" value="SABADO" id="saturday" checked={this.state.saturday} onChange={this.handleWeekdaysChange} />Sábado</label>
              <label className="checkbox-inline" htmlFor="sunday"><input type="checkbox" value="DOMINGO" id="sunday" checked={this.state.sunday} onChange={this.handleWeekdaysChange} />Domingo</label>
              <br></br>
              <br></br>

              <div className="form-group">
              <div className="col-sm-7"> </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal">
                  Importar
                  </button>
              </div>
              <div className="col-sm-2">
                <Validation.components.Button type="button" className="btn btn-primary btn-block" onClick={this.handleCreate}>
                  Criar
                </Validation.components.Button>
              </div>
            </div>
            </Validation.components.Form>
          </div>
        </div>
      </div>

    );
  }
}
