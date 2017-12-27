import React from 'react';
import { hashHistory } from 'react-router';

import ImportService from 'services/import/ImportService'
import ClassService from 'services/ClassService'

export default class ImportClass extends React.Component {

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
    ImportService.import(this.state.file, ClassService.classMapper, ClassService.importClasses)
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
                Aulas importadas com sucesso.
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
              Escolha um arquivo de extensão <b>.CSV</b> contendo os aulas que se deseja importar.
                <br />
              A separação dos campos de cada aula será usando <b>;</b> e cada aula ficará em um linha.
                <br />
              A separação dos dias da semana de cada aula será usando <b>|</b>.
                <br />
              <br />
              O conteúdo do arquivo deve estar no seguinte estilo para cada aula:
                <br />
              <b>TURMAID;MATERIAID;PROFESSORID;LOCALID;HORARIOINICIO;HORARIOFIM;DATAINICIO;DATAFIM;DIASDASEMANA</b>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8">
              Por exemplo:
                <br />
              <b>
                2;4;3;1;22:59;23:59;2017-08-30;2017-12-16;SEGUNDA|QUARTA|DOMINGO
                  <br />
                1;3;2;2;11:00;12:30;2017-08-20;2017-12-20;QUARTA
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
