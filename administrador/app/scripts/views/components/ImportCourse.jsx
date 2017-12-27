import React from 'react';
import { hashHistory } from 'react-router';

import ImportService from 'services/import/ImportService'
import CourseService from 'services/CourseService'

export default class ImportCourse extends React.Component {

  constructor(props) {
    super(props);

    this.state = { file: '', success: 0, error: '' };

    this.handleImport = this.handleImport.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  handleImport() {
    ImportService.import(this.state.file, CourseService.courseMapper, CourseService.importCourses)
      .then(() => {
        this.setState({ success: 1, error: '' })
      })
      .catch((error) => {
        this.setState({ error: error, success: 0 })
      });
  }

  render() {
    return (
        <div className="form-horizontal">
          <div className="search-form" id="search-form">

            <div className="col-sm-9">
              <div className={this.state.success ? '' : 'hidden'}>
                <div className="alert alert-success">
                  Alunos importados com sucesso.
              </div>

              </div>

              <div className={this.state.error ? '' : 'hidden'}>
                <div className="alert alert-danger">
                  {this.state.error.substring(0, 150)}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-8">
                <h4>Instruções:</h4>
                Escolha um arquivo de extensão <b>.CSV</b> contendo as materias que se deseja importar.
                <br />
                A separação dos campos de cada materia será usando <b>;</b> e cada materia ficará em um linha.
                <br />
                <br />
                O conteúdo do arquivo deve estar no seguinte estilo para cada materias:
                <br />
                <b>ID;NOME</b>

              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-8">
                Por exemplo:
                <br />
                <b>
                  1;Projetos de Sistemas
                  <br />
                  2;Banco de Dados
                </b>
                <br />
                <br />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-2">
                <div className="fileupload fileupload-new" data-provides="fileupload">
                  <input className="btn btn-primary btn-file" name="selectFile" type="file" onChange={this.handleFileChange} />
                  <span className="fileupload-preview"></span>
                </div>
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-primary btn-block" onClick={this.handleImport}>
                  Importar
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
