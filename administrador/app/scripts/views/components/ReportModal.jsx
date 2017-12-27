import React from 'react';

export default class ReportModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = { report: {} }
    }

    componentWillReceiveProps() {
        this.setState({ report: this.props.report });
    }

    exportarRelatorio = () => {
        var printContents = document.getElementById("relatorio").innerHTML;
        let w = window.open();
        w.document.write(printContents);
        w.print();
        w.close();
    }

    render() {
        /*
        let materias;
        let alunos;

        if ((this.state.report.students) && (this.state.report.students[0].presencas)) {

            for (let aluno in this.state.report.students) {
                for (let materia in aluno.presencas)
                    materias += <th>{materia.nomeMateria}</th>;
            }
        }

        console.log(materias);
        */
        return (<div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div id="relatorio">
                        <div className="modal-header">
                            
                            <h4 className="modal-title">Relatório de Presenças - {this.state.report.group}</h4>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Aluno</th>
                                        <th>Calculo II</th>
                                        <th>Banco de Dados</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th scope="row">Marcelo Silva</th>
                                        <th>50%</th>
                                        <th>75%</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Antonio Piau</th>
                                        <th>90%</th>
                                        <th>100%</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Felipe Kohlmann</th>
                                        <th>85%</th>
                                        <th>90%</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.exportarRelatorio}>Exportar</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}