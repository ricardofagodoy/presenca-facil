import React from 'react';
import StudentService from '../../services/StudentService';

export default class ResultTable extends React.Component {

  constructor(props){
    super(props);

    this.state = {alunos: []}

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearch();
  }

  handleSearch(){
    StudentService.getAllStudents()
    .then((response) => {
      this.setState({alunos: response.data.object})
    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {
    const content = this.state.alunos.map((aluno) =>
    <tr key={aluno.id}>
      <td>{aluno.id}</td>
      <td>{aluno.nome}</td>
      <td>Sistemas de Informação 2017</td>
      <td>
        <span className="glyphicon glyphicon-eye-open icon-search"></span>
        <span className="glyphicon glyphicon-pencil icon-search"></span>
        <span className="glyphicon glyphicon-trash icon-search"></span>
      </td>
    </tr>
    );

    return (
      <div className="container">
      <form className="form-horizontal">
        <div className="search-form">
          <div className="form-group">
            <h3>Buscar Alunos</h3>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-1" htmlFor="ra">RA: </label>
            <div className="col-sm-3">
              <input type="text" className="form-control" id="ra"></input>
            </div>
            <div className="col-sm-3"></div>
            <label className="control-label col-sm-1" htmlFor="class">Turma:</label>
            <div className="col-sm-4">
              <select className="form-control" id="class">
                <option>Sistemas de Informação 2017</option>
                <option>Ciencia da Computação 2017</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-1" htmlFor="name">Nome: </label>
            <div className="col-sm-3">
              <input type="text" className="form-control" id="name"></input>
            </div>
            <div className="col-sm-7"> </div>
            <div className="col-sm-1">
              <button type="button" className="btn btn-primary btn-md right" onClick={this.handleSearch}>Buscar</button>
            </div>
          </div>
        </div>
  </form>
        <table className="table table-hover">
          <thead>
            <tr>
              <th width="15%">RA</th>
              <th width="35%">Nome</th>
              <th width="41%">Turma</th>
              <th width="9%"></th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
        <center>
          <ul className="pagination">
            <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
          </ul>
        </center>
      </div>
    );
  }
}