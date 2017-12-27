import React from 'react';
import { hashHistory } from 'react-router';

import ImportService from 'services/import/ImportService'
import GroupService from 'services/GroupService'

export default class ImportGroup extends React.Component {

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
    ImportService.import(this.state.file, GroupService.groupMapper, GroupService.importGroups)
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
                Escolha um arquivo de extensão <b>.CSV</b> contendo as turmas que se deseja importar.
                <br />
                A separação dos campos de cada turma será usando <b>;</b> e cada turma ficará em um linha.
                <br />
                A separação dos alunos de cada turma será usando <b>|</b>.
                <br />
                <br />
                O conteúdo do arquivo deve estar no seguinte estilo para cada turma:
                <br />
                <b>ID;NOME;ALUNOSID</b>

              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-8">
                Por exemplo:
                <br />
                <b>
                  1;Sistemas de Informacao Noturno;1|2|3|6|7|9|15
                  <br />
                  2;Jornalismo Noturno;3|4|9|15|22|26
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
